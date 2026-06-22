"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { XiaojingAvatar } from "@/components/motion/xiaojing-avatar";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code || code.length !== 6) {
      toast.error("请输入 6 位验证码");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (error) throw error;
      toast.success("登录成功");
      router.push(redirectTo);
    } catch (err) {
      toast.error("验证失败", {
        description: err instanceof Error ? err.message : "验证码可能已过期",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      toast.error("重新发送失败");
    } else {
      toast.success("验证码已重新发送");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 px-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          返回登录
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden">
              <XiaojingAvatar size={48} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">输入验证码</h1>
            <p className="text-sm text-neutral-500">
              我们已向 <span className="font-medium text-neutral-700">{email}</span> 发送验证码
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="• • • • • •"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              className="text-center text-2xl tracking-[0.5em] font-mono h-14"
            />
            <Button
              onClick={handleVerify}
              disabled={loading || code.length !== 6}
              className="w-full"
              size="lg"
            >
              {loading ? "验证中..." : "验证登录"}
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">没收到？</span>
            <button
              onClick={handleResend}
              className="inline-flex items-center gap-1 text-primary-600 hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              重新发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
