"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface DataParticlesProps {
  className?: string;
  count?: number;
  color?: "primary" | "accent" | "mixed";
}

/**
 * 数据粒子背景 —— 用于营造 AI / 职业数据的灵动氛围
 * 由小型几何元素（点、圆环、对勾、短横线）组成，缓慢漂浮上升
 */
export function DataParticles({ className, count = 20, color = "mixed" }: DataParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 3,
      type: Math.random() > 0.6 ? "ring" : Math.random() > 0.3 ? "check" : "dot",
      colorClass:
        color === "primary"
          ? "text-primary-400"
          : color === "accent"
          ? "text-accent-400"
          : Math.random() > 0.5
          ? "text-primary-300"
          : "text-accent-300",
    }));
  }, [count, color]);

  return (
    <div className={cn("pointer-events-none overflow-hidden", className)}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.colorClass}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6, 0],
            y: [-20, -60, -100],
            scale: [0.5, 1, 0.8, 1.1, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.type === "ring" && (
            <svg viewBox="0 0 10 10" className="w-full h-full">
              <circle
                cx="5"
                cy="5"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          )}
          {p.type === "check" && (
            <svg viewBox="0 0 10 10" className="w-full h-full">
              <path
                d="M 2 5 L 4 7 L 8 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {p.type === "dot" && (
            <div className="w-full h-full rounded-full bg-current" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
