"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    // Spring physics coordinates for magnetic effect
    setCoords({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.1 }}
      className={cn(
        "relative overflow-hidden group border border-white/10 rounded-xl px-6 py-3 font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:shadow-glow",
        className
      )}
      {...props}
    >
      {/* Glow tracker background layer */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full w-32 h-32 bg-primary-400/20 blur-xl"
          style={{
            left: coords.x * 2.5 + 40,
            top: coords.y * 2.5 + 10,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
