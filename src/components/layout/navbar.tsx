"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, LogOut, User } from "lucide-react";
import { Logo } from "@/components/motion/logo";
import { useAuth } from "@/components/providers/auth-provider";
import { XiaojingAvatar } from "@/components/motion/xiaojing-avatar";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/#features", label: "功能" },
  { href: "/about", label: "关于" },
];

// 需要深色背景 Navbar（Hero区深色）的路由
const DARK_HERO_ROUTES = ["/"];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isDemoMode } = useAuth();

  const isOnDarkHero = DARK_HERO_ROUTES.includes(pathname);
  const isDark = isOnDarkHero && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#040E1E]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          : isOnDarkHero
          ? "bg-transparent border-b border-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
      )}
    >
      <div className="container-page mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Logo className="h-8" darkMode={isDark} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors duration-200",
                isDark
                  ? pathname === link.href
                    ? "text-white font-semibold"
                    : "text-neutral-300 hover:text-white"
                  : pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-primary-600 font-medium"
                  : "text-neutral-600 hover:text-primary-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {isDemoMode && (
                <span className="text-[10px] bg-accent-50 text-accent-600 px-2 py-0.5 rounded-full font-medium">
                  Demo
                </span>
              )}
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors",
                  isDark ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-primary-600"
                )}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden">
                  <XiaojingAvatar size={28} />
                </div>
                <span>{user.email?.split("@")[0] || "用户"}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className={isDark ? "text-neutral-300 hover:text-white hover:bg-white/10" : ""}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={isDark ? "text-neutral-300 hover:text-white hover:bg-white/10" : ""}
              >
                <Link href="/login">登录</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className={isDark
                  ? "bg-primary-500 hover:bg-primary-400 text-white border-0 btn-glow"
                  : ""
                }
              >
                <Link href="/start">免费开始</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              className={isDark ? "text-white hover:bg-white/10" : ""}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-[#040E1E] border-white/10">
            <SheetTitle className="sr-only">导航菜单</SheetTitle>
            {user && (
              <div className="flex items-center gap-3 px-1 py-3 border-b border-white/10 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden">
                  <XiaojingAvatar size={36} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.email?.split("@")[0] || "用户"}
                  </p>
                  {isDemoMode && (
                    <span className="text-[10px] text-accent-400">Demo 模式</span>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base py-2 transition-colors",
                    pathname === link.href
                      ? "text-primary-400 font-medium"
                      : "text-neutral-300 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      size="default"
                      asChild
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        我的仪表盘
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="default"
                      className="w-full text-neutral-400 hover:text-white hover:bg-white/10"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="default"
                      asChild
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Link href="/login">登录</Link>
                    </Button>
                    <Button size="default" asChild className="w-full bg-primary-500 hover:bg-primary-400">
                      <Link href="/start">免费开始</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
