import React, { useEffect, useMemo, useRef, useState } from 'react';

type SmartImageProps = {
    src: string;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    loading?: 'lazy' | 'eager';
    cropBorders?: boolean; // if true, trims uniform/transparent borders; default false
};

// Crops uniform borders (transparent or near-uniform color) from an image.
// Falls back to original src if processing fails (e.g., CORS-tainted canvas).
const SmartImage: React.FC<SmartImageProps> = ({ src, alt = '', className, style, onClick, loading = 'lazy', cropBorders = false }) => {
    const [processedSrc, setProcessedSrc] = useState<string | null>(null);
    const cacheRef = useRef<Map<string, string>>(new Map());

    const isLikelyOpaqueJpeg = useMemo(() => {
        const lower = src.toLowerCase();
        return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.includes('.jpg?') || lower.includes('.jpeg?');
    }, [src]);

    useEffect(() => {
        if (!cropBorders) {
            // No processing requested; ensure original src is used
            setProcessedSrc(null);
            return;
        }
        let cancelled = false;
        const cache = cacheRef.current;
        if (cache.has(src)) {
            setProcessedSrc(cache.get(src)!);
            return;
        }

        const img = new Image();
        // Attempt to enable CORS-safe canvas usage for external images
        img.crossOrigin = 'anonymous';
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = src;

        img.onload = () => {
            try {
                const w = img.naturalWidth;
                const h = img.naturalHeight;
                if (!w || !h) return;

                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, w, h);
                const data = imageData.data;

                // Helper to read pixel RGBA
                const getPixel = (x: number, y: number) => {
                    const idx = (y * w + x) * 4;
                    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]] as [number, number, number, number];
                };

                // Sample corners to estimate border color (for JPEG without alpha)
                const corners = [
                    getPixel(0, 0),
                    getPixel(w - 1, 0),
                    getPixel(0, h - 1),
                    getPixel(w - 1, h - 1),
                ];
                const avgCorner = corners.reduce(
                    (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2], acc[3] + p[3]] as [number, number, number, number],
                    [0, 0, 0, 0]
                ).map((v) => Math.round(v / corners.length)) as [number, number, number, number];

                const colorDist = (p: [number, number, number, number], q: [number, number, number, number]) => {
                    const dr = p[0] - q[0];
                    const dg = p[1] - q[1];
                    const db = p[2] - q[2];
                    return Math.sqrt(dr * dr + dg * dg + db * db);
                };

                const alphaThreshold = 5; // treat very low alpha as transparent
                const colorThreshold = 12; // tolerance for near-uniform border color

                // Find bounding box of content: pixels that are not transparent and not close to border color
                let minX = w - 1;
                let minY = h - 1;
                let maxX = 0;
                let maxY = 0;

                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        const p = getPixel(x, y);
                        const a = p[3];
                        const isTransparent = a <= alphaThreshold;
                        const isBorderLike = colorDist(p, avgCorner) <= colorThreshold;
                        // For opaque JPEGs, ignore alpha check; for PNGs, consider alpha
                        const isBackground = isTransparent || (isLikelyOpaqueJpeg && isBorderLike) || (!isLikelyOpaqueJpeg && isBorderLike);
                        if (!isBackground) {
                            if (x < minX) minX = x;
                            if (y < minY) minY = y;
                            if (x > maxX) maxX = x;
                            if (y > maxY) maxY = y;
                        }
                    }
                }

                // If nothing found (e.g., fully uniform), fallback
                if (maxX <= minX || maxY <= minY) {
                    setProcessedSrc(src);
                    cache.set(src, src);
                    return;
                }

                const cropW = maxX - minX + 1;
                const cropH = maxY - minY + 1;

                const outCanvas = document.createElement('canvas');
                outCanvas.width = cropW;
                outCanvas.height = cropH;
                const outCtx = outCanvas.getContext('2d');
                if (!outCtx) return;
                outCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

                const outUrl = outCanvas.toDataURL('image/jpeg', 0.92);
                if (!cancelled) {
                    setProcessedSrc(outUrl);
                    cache.set(src, outUrl);
                }
            } catch (e) {
                // Likely CORS-tainted canvas or other issue; fallback to original
                if (!cancelled) {
                    setProcessedSrc(src);
                    cacheRef.current.set(src, src);
                }
            }
        };

        img.onerror = () => {
            if (!cancelled) setProcessedSrc(src);
        };

        return () => {
            cancelled = true;
        };
    }, [src, isLikelyOpaqueJpeg, cropBorders]);

    return (
        <img
            src={processedSrc || src}
            alt={alt}
            className={className}
            style={style}
            onClick={onClick}
            loading={loading}
        />
    );
};

export default SmartImage;
