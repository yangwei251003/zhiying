import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "职映 ZhiYing — 先照清自己，再匹配岗位",
    template: "%s | 职映 ZhiYing",
  },
  description:
    "AI 职业自我认知与岗位匹配平台。帮你建立可追溯的职业知识库，深度剖析真实能力，生成每句话都有依据的简历。",
  keywords: [
    "职映",
    "ZhiYing",
    "AI 简历",
    "职业规划",
    "岗位匹配",
    "大学生求职",
    "知识库",
    "真实匹配",
  ],
  authors: [{ name: "ZhiYing Team" }],
  creator: "ZhiYing",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://nobuzpvtdjmkwodjbdfx.supabase.co",
    siteName: "职映 ZhiYing",
    title: "职映 ZhiYing — 先照清自己，再匹配岗位",
    description: "AI 职业自我认知与岗位匹配平台。每份简历，都有迹可循。",
    images: ["/assets/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1"><Suspense fallback={null}>{children}</Suspense></main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
