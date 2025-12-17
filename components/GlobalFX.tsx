import React, { useEffect, useRef } from 'react';

const GlobalFX: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- CURSOR LOGIC ---
    const cursor = cursorRef.current;
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
      const moveCursor = (e: MouseEvent) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      };
      
      const mouseDown = () => cursor.classList.add('active');
      const mouseUp = () => cursor.classList.remove('active');

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', mouseDown);
      window.addEventListener('mouseup', mouseUp);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mousedown', mouseDown);
        window.removeEventListener('mouseup', mouseUp);
      };
    }
  }, []);

  useEffect(() => {
    // --- CANVAS PARTICLES LOGIC ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      spin: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1; // Small snow/spark
        this.speed = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.y += this.speed;
        this.angle += this.spin;
        if (this.y > height) {
          this.y = -10;
          this.x = Math.random() * width;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Init particles
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas id="fx-canvas" ref={canvasRef} />
      <div className="cursor-dot" ref={cursorRef} />
    </>
  );
};

export default GlobalFX;