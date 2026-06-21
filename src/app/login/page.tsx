"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { Github, Mail, ArrowLeft, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { signInWithOAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email || !email.includes("@")) {
      toast.error("请输入有效的邮箱地址");
      return;
    }
    setLoading(true);
    try {
      // 调用 Supabase OTP 发送
      const { supabase } = await import("@/lib/supabase/client");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirectTo}`,
        },
      });
      if (error) throw error;
      toast.success("验证码已发送至邮箱，请查收");
      router.push(`/auth/verify?email=${encodeURIComponent(email)}&redirect=${redirectTo}`);
    } catch (err) {
      toast.error("发送失败，请稍后重试", {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 px-4">
      <div className="w-full max-w-md">
        {/* 返回 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">欢迎回到职映</h1>
            <p className="text-sm text-neutral-500">登录后继续你的职业探索之旅</p>
          </div>

          {/* 邮箱登录 */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700">邮箱</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
              />
            </div>
            <Button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              <Mail className="mr-2 h-4 w-4" />
              {loading ? "发送中..." : "发送验证码"}
            </Button>
          </div>

          {/* 分割线 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-neutral-400">或</span>
            </div>
          </div>

          {/* GitHub OAuth */}
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => signInWithOAuth("github")}
          >
            <Github className="mr-2 h-4 w-4" />
            使用 GitHub 登录
          </Button>

          {/* 底部 */}
          <p className="text-center text-xs text-neutral-400">
            首次使用将自动为你创建账号。继续即表示同意
            <Link href="/terms" className="text-primary-600 mx-1 hover:underline">
              用户协议
            </Link>
            和
            <Link href="/privacy" className="text-primary-600 mx-1 hover:underline">
              隐私政策
            </Link>
          </p>
        </div>

        {/* 体验入口 */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          还没准备好？
          <Link href="/start" className="text-primary-600 ml-1 hover:underline font-medium">
            先免登录体验 →
          </Link>
        </p>
      </div>
    </div>
  );
}
