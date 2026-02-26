"use client";
import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let bubbles: Bubble[] = [];
    const bubbleCount = 60; // 气泡密度，可自行调节

    class Bubble {
      x!: number;
      y!: number;
      radius!: number;
      speed!: number;
      alpha!: number;
      amplitude!: number;
      offset!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.radius = Math.random() * 6 + 2;
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.speed = Math.random() * 0.8 + 0.4;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.amplitude = Math.random() * 1.5;
        this.offset = Math.random() * 100;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin((this.y * 0.015) + this.offset) * 0.6;
        if (this.y < -50) this.reset();
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
        
        // 增加一个微小的光晕（二次元高光）
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      }
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const init = () => {
      handleResize();
      bubbles = Array.from({ length: bubbleCount }, () => new Bubble());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach(b => {
        b.update();
        b.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(125, 211, 252, 0.05) 100%)'
      }}
    />
  );
}