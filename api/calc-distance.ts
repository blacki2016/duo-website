import type { Request, Response } from 'express';

// Haversine distance in km
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function geocode(query: string) {
    // Use Nominatim (OSM). Respect usage policy: add simple UA.
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=de`;
    const resp = await fetch(url, { headers: { 'User-Agent': 'Preisrechner/1.0 (+contact@wieseckel.com)' } });
    if (!resp.ok) throw new Error('Geocoding failed');
    const json = (await resp.json()) as Array<{ lat: string; lon: string }>;
    if (!json?.length) throw new Error('Location not found');
    return { lat: parseFloat(json[0].lat), lon: parseFloat(json[0].lon) };
}

export default async function handler(req: Request, res: Response) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const { postalCode } = req.body as { postalCode?: string };
        if (!postalCode || !/^\d{5}$/.test(postalCode)) {
            return res.status(400).json({ error: 'Invalid postal code' });
        }
        // Base: Neuhof an der Zenn 90616, Germany
        const base = await geocode('Neuhof an der Zenn 90616, Germany');
        const dest = await geocode(`${postalCode}, Germany`);
        const km = haversine(base.lat, base.lon, dest.lat, dest.lon);
        // Round to 1 decimal, minimum 0
        const kilometers = Math.max(0, Math.round(km * 10) / 10);
        return res.status(200).json({ kilometers });
    } catch (err) {
        console.error('calc-distance error', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
