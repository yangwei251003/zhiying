"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { Logo } from "@/components/motion/logo";
import {
  Github,
  Mail,
  ArrowLeft,
  Flame,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { signInWithOAuth, sendDemoCode, verifyDemoCode } = useAuth();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo 模式：发送验证码
  const handleDemoSendCode = () => {
    if (!email || !email.includes("@")) {
      toast.error("请输入有效的邮箱地址");
      return;
    }
    const generatedCode = sendDemoCode(email);
    toast.success("验证码已生成", {
      description: `Demo 模式 · 验证码：${generatedCode}`,
    });
    setStep("code");
  };

  // Demo 模式：验证码登录
  const handleDemoVerify = () => {
    if (!code || code.length !== 6) {
      toast.error("请输入 6 位验证码");
      return;
    }
    const ok = verifyDemoCode(email, code);
    if (ok) {
      toast.success("登录成功，欢迎！");
      router.push(redirectTo);
    } else {
      toast.error("验证码错误或已过期");
    }
  };

  // Supabase OTP 模式：发送邮箱验证码
  const handleOTPSendCode = async () => {
    if (!email || !email.includes("@")) {
      toast.error("请输入有效的邮箱地址");
      return;
    }
    setLoading(true);
    try {
      const { supabase: sb } = await import("@/lib/supabase/client");
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      toast.success("验证码已发送至邮箱，请查收");
      router.push(`/auth/verify?email=${encodeURIComponent(email)}&redirect=${redirectTo}`);
    } catch (err) {
      toast.error("发送失败，请重试", {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendDemo = () => {
    const generatedCode = sendDemoCode(email);
    toast.success("新验证码已生成", {
      description: `验证码：${generatedCode}`,
    });
  };

  return (
    <div className="w-full max-w-md">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 space-y-5">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <Logo showText={false} size={48} />
          <h1 className="text-2xl font-bold text-neutral-900">
            {step === "email" ? "欢迎来到职映" : "输入验证码"}
          </h1>
          <p className="text-sm text-neutral-500">
            {step === "email"
              ? "登录后管理你的知识库和简历"
              : `验证码已发送至 ${email}`}
          </p>
        </div>

        {/* Demo 免登录标签 */}
        {step === "email" && (
          <div className="rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 p-3 flex items-center gap-2">
            <Flame className="h-4 w-4 text-accent-500 flex-shrink-0" />
            <div className="text-xs text-primary-700">
              <span className="font-medium">Demo 免登录体验：</span>
              验证码直接显示在页面，无需查收邮件
            </div>
          </div>
        )}

        {step === "email" ? (
          <>
            {/* 邮箱输入 */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">邮箱</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleDemoSendCode()}
                />
              </div>

              {/* Dem 模式按钮 */}
              <Button
                onClick={handleDemoSendCode}
                className="w-full"
                size="lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                获取验证码（Demo 免登录体验）
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* 分割线 */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-neutral-400">其他方式</span>
                </div>
              </div>

              {/* Supabase OTP */}
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleOTPSendCode}
                disabled={loading}
              >
                <Mail className="mr-2 h-4 w-4" />
                {loading ? "发送中..." : "邮箱验证码登录（需查收邮件）"}
              </Button>

              {/* GitHub */}
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => signInWithOAuth("github")}
              >
                <Github className="mr-2 h-4 w-4" />
                使用 GitHub 登录
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* 验证码输入 */}
            <div className="space-y-3">
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="• • • • • •"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleDemoVerify()}
                className="text-center text-2xl tracking-[0.5em] font-mono h-14"
              />
              <Button
                onClick={handleDemoVerify}
                disabled={code.length !== 6}
                className="w-full"
                size="lg"
              >
                验证登录
              </Button>
              <button
                onClick={handleResendDemo}
                className="w-full text-center text-sm text-primary-600 hover:underline flex items-center justify-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                重新获取验证码
              </button>
              <button
                onClick={() => setStep("email")}
                className="w-full text-center text-sm text-neutral-500 hover:text-neutral-700"
              >
                换一个邮箱
              </button>
            </div>
          </>
        )}

        {/* 底部 */}
        <p className="text-center text-xs text-neutral-400 pt-2">
          继续即表示同意
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
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 px-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
