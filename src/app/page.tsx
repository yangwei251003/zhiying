"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HeroSection } from "@/components/features/hero-section";
import { PainPointsSection } from "@/components/features/pain-points-section";
import { HowItWorksSection } from "@/components/features/how-it-works-section";
import { ModuleOverviewSection } from "@/components/features/module-overview-section";
import { ValuesSection } from "@/components/features/values-section";
import { FinalCtaSection } from "@/components/features/final-cta-section";
import { Loader2 } from "lucide-react";

// 动态导入所有客户端组件以避免 server-side framer-motion issues
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 text-primary-500 animate-spin" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <HowItWorksSection />
      <ModuleOverviewSection />
      <ValuesSection />
      <FinalCtaSection />
    </>
  );
}
