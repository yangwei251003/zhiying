"use client";

/**
 * 职映 Confetti 礼花喷射粒子特效
 * 无需外部依赖，动态创建 Canvas 进行彩带粒子渲染，播完后自动销毁
 */
export function fireConfetti() {
  if (typeof window === "undefined") return;

  // 1. 创建或获取全局全屏 Canvas
  let canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 适配高分屏 (Retina)
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    width: number;
    height: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
  }

  // 职映专属色板：主色蓝(#1F6FBF)、次色蓝(#85B7EB)、辅助橙(#F97316)、次色橙(#FED7AA)、成功绿(#10B981)
  const colors = ["#1F6FBF", "#85B7EB", "#F97316", "#FED7AA", "#10B981", "#F59E0B"];
  const particles: Particle[] = [];

  // 从左下角和右下角往屏幕中央喷射
  const createFirework = (originX: number) => {
    const angle = originX < width / 2 ? -Math.PI / 4 : (-Math.PI * 3) / 4;
    for (let i = 0; i < 60; i++) {
      const spread = (Math.random() - 0.5) * 0.45; // 喷射扇面弧度
      const speed = 12 + Math.random() * 12;      // 喷射初始速度
      particles.push({
        x: originX,
        y: height + 20,
        vx: Math.cos(angle + spread) * speed,
        vy: Math.sin(angle + spread) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 5 + Math.random() * 7,
        height: 7 + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 1,
      });
    }
  };

  createFirework(50);
  createFirework(width - 50);

  const gravity = 0.35;    // 重力
  const friction = 0.97;   // 空气阻力

  function update() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, width, height);

    let hasActiveParticles = false;

    for (const p of particles) {
      if (p.opacity <= 0) continue;

      // 物理运动更新
      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity;
      p.vx *= friction;
      p.vy *= friction;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012; // 逐渐淡出

      if (p.opacity > 0 && p.y < height + 50) {
        hasActiveParticles = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        // 绘制彩色碎屑卡片
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }
    }

    if (hasActiveParticles) {
      requestAnimationFrame(update);
    } else {
      // 动画播放完毕后，自动从 DOM 移除
      canvas.remove();
    }
  }

  update();
}
