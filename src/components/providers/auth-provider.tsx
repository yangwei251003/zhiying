"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const DEMO_USER_KEY = "zhiying_demo_user";
const DEMO_VERIFY_CODE = "888888";
const DEMO_CODE_EXPIRY_KEY = "zhiying_demo_code_expiry";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signInWithOAuth: (provider: "github") => Promise<void>;
  signInWithDemo: (email: string) => { code: string };
  verifyDemoCode: (email: string, code: string) => boolean;
  signOut: () => Promise<void>;
  sendDemoCode: (email: string) => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** 创建一个假的 User 对象用于 Demo 模式 */
function createDemoUser(email: string): User {
  return {
    id: "demo-user-001",
    aud: "authenticated",
    role: "authenticated",
    email: email,
    email_confirmed_at: new Date().toISOString(),
    phone: "",
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    app_metadata: { provider: "demo", providers: ["demo"] },
    user_metadata: { full_name: email.split("@")[0], avatar_url: "" },
    identities: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_anonymous: false,
  } as User;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 先尝试恢复 Demo 模式
    const storedDemo = typeof window !== "undefined" ? localStorage.getItem(DEMO_USER_KEY) : null;
    if (storedDemo) {
      try {
        const demoEmail = JSON.parse(storedDemo);
        setUser(createDemoUser(demoEmail));
        setSession({ user: createDemoUser(demoEmail) } as Session);
        setIsDemoMode(true);
        setIsLoading(false);
        return;
      } catch {}
    }

    // 否则走 Supabase 正常流程
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithOAuth = async (provider: "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  /** Demo 模式：生成验证码并返回 */
  const sendDemoCode = (email: string): string => {
    // 固定验证码 + 邮箱后4位，让演示更真实
    const code = DEMO_VERIFY_CODE;
    localStorage.setItem(DEMO_CODE_EXPIRY_KEY, JSON.stringify({ email, code, expires: Date.now() + 300000 }));
    return code;
  };

  /** Demo 模式：验证码登录 */
  const verifyDemoCode = (email: string, code: string): boolean => {
    const stored = localStorage.getItem(DEMO_CODE_EXPIRY_KEY);
    if (!stored) return false;
    try {
      const data = JSON.parse(stored);
      if (data.email === email && data.code === code && Date.now() < data.expires) {
        // 登录成功
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(email));
        localStorage.removeItem(DEMO_CODE_EXPIRY_KEY);
        setUser(createDemoUser(email));
        setSession({ user: createDemoUser(email) } as Session);
        setIsDemoMode(true);
        return true;
      }
    } catch {}
    return false;
  };

  /** 兼容旧接口 */
  const signInWithDemo = (email: string) => {
    const code = sendDemoCode(email);
    return { code };
  };

  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem(DEMO_USER_KEY);
      localStorage.removeItem(DEMO_CODE_EXPIRY_KEY);
      setUser(null);
      setSession(null);
      setIsDemoMode(false);
    } else {
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isDemoMode,
        signInWithOAuth,
        signInWithDemo,
        verifyDemoCode,
        signOut,
        sendDemoCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
