"use client";

import { XiaojingMascot } from "./xiaojing-mascot";
import { cn } from "@/lib/utils";

interface XiaojingAvatarProps {
  className?: string;
  size?: number;
  expression?: "smile" | "happy" | "thinking";
}

/**
 * 职映小镜头像 —— 用于聊天、加载状态等较小场景
 */
export function XiaojingAvatar({ className, size = 32, expression = "smile" }: XiaojingAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500 shadow-sm",
        className
      )}
      style={{ width: size, height: size }}
    >
      <XiaojingMascot
        size={size * 1.1}
        expression={expression}
        pose="standing"
        animate={false}
      />
    </div>
  );
}
