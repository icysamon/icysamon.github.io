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
    let lightRays: LightRay[] = [];
    let animationFrameId: number;

    // 画面サイズのリサイズ処理
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // --- 幻想的な泡のクラス ---
    class Bubble {
      x: number = 0;
      y: number = 0;
      radius: number = 0;
      speed: number = 0;
      alpha: number = 0;
      oscillationOffset: number = 0;

      constructor() {
        this.reset(true);
      }

      // 泡の初期化（initialがtrueなら画面内にランダム配置）
      reset(initial: boolean = false) {
        this.radius = Math.random() * 5 + 1; // 泡のサイズ
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 100;
        this.speed = Math.random() * 0.4 + 0.1; // 上昇速度
        this.alpha = Math.random() * 0.3 + 0.1; // 透明度
        this.oscillationOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speed;
        // ゆらゆらとした横揺れ
        this.x += Math.sin(this.y * 0.015 + this.oscillationOffset) * 0.3;
        if (this.y + this.radius < 0) this.reset();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // 泡の中心にハイライトを入れ、水滴のような質感を出す
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha + 0.4})`);
        gradient.addColorStop(1, `rgba(200, 235, 255, ${this.alpha * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // --- 海底に差し込む光の筋（サンレイ） ---
    class LightRay {
      x: number = 0;
      width: number = 0;
      angle: number = 0;
      alpha: number = 0;
      speed: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.width = Math.random() * 150 + 80; 
        this.angle = Math.random() * 0.2 - 0.1; 
        this.alpha = Math.random() * 0.04 + 0.01; 
        this.speed = Math.random() * 0.06 + 0.02; 
      }

      update() {
        this.x += this.speed;
        if (this.x - this.width > width) {
          this.x = -this.width * 2; 
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.rotate(this.angle);
        ctx.beginPath();
        
        // ほんのりピンクがかった温かい光（二次元的な幻想演出）
        const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width * 0.5, height);
        gradient.addColorStop(0, `rgba(255, 240, 245, ${this.alpha})`); 
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`); 
        
        ctx.fillStyle = gradient;
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.x + this.width, 0);
        ctx.lineTo(this.x + this.width * 0.5, height);
        ctx.lineTo(this.x - this.width * 0.5, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const setup = () => {
      handleResize();
      bubbles = Array.from({ length: 80 }, () => new Bubble());
      lightRays = Array.from({ length: 5 }, () => new LightRay());
    };

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // --- マカロン・ファンタジー・グラデーション ---
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      // 上部：透き通るような明るい水色
      bgGradient.addColorStop(0, 'rgba(164, 219, 255, 0.4)'); 
      // 下部：幻想的なラベンダーパープル
      bgGradient.addColorStop(1, 'rgba(187, 160, 255, 0.4)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 光の筋の描画（スクリーン合成で輝きを強調）
      ctx.globalCompositeOperation = 'screen';
      lightRays.forEach(ray => {
        ray.update();
        ray.draw();
      });

      // 泡の描画
      ctx.globalCompositeOperation = 'source-over';
      bubbles.forEach(b => {
        b.update();
        b.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    setup();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}