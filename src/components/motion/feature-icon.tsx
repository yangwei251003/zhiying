"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeatureIconProps {
  name: "knowledge" | "jd" | "match" | "resume" | "interview";
  className?: string;
  size?: number;
}

const iconMap = {
  knowledge: { src: "/assets/icons/icon-knowledge.png", alt: "职业知识库" },
  jd: { src: "/assets/icons/icon-jd.png", alt: "JD解析" },
  match: { src: "/assets/icons/icon-match.png", alt: "AI匹配" },
  resume: { src: "/assets/icons/icon-resume.png", alt: "简历生成" },
  interview: { src: "/assets/icons/icon-interview.png", alt: "模拟面试" },
};

export function FeatureIcon({ name, className, size = 48 }: FeatureIconProps) {
  const icon = iconMap[name];
  return (
    <div
      className={cn(
        "relative flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-sm border border-neutral-100",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={icon.src}
        alt={icon.alt}
        fill
        className="object-contain p-0.5"
        sizes="(max-width: 768px) 64px, 72px"
      />
    </div>
  );
}
