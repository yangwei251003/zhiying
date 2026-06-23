"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  showEnglish?: boolean;
  size?: number;
  href?: string;
  darkMode?: boolean;
}

/**
 * 职映品牌 Logo 组件
 * 使用用户提供的品牌 logo 图片，支持导航/页脚等场景
 */
export function Logo({
  className,
  showText = true,
  showEnglish = true,
  size = 32,
  href = "/",
  darkMode = false,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <Image
          src="/assets/brand/logo.png"
          alt="职映 ZhiYing"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex items-center gap-1.5">
          <span className={`text-lg font-semibold ${darkMode ? "text-white" : "text-neutral-900"}`}>职映</span>
          {showEnglish && (
            <span className={`hidden sm:inline-block text-sm font-medium ${darkMode ? "text-primary-300" : "text-primary-600"}`}>
              ZhiYing
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
