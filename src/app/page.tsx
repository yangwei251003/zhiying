"use client";

import { HeroSection } from "@/components/features/hero-section";
import { PainPointsSection } from "@/components/features/pain-points-section";
import { HowItWorksSection } from "@/components/features/how-it-works-section";
import { ModuleOverviewSection } from "@/components/features/module-overview-section";
import { ValuesSection } from "@/components/features/values-section";
import { FinalCtaSection } from "@/components/features/final-cta-section";

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
