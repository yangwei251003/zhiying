"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 导出 XiaojingState 以供外部组件（如 HeroSection）引用，并兼容 "welcome" 状态
export type XiaojingState = "idle" | "listening" | "speaking" | "thinking" | "celebrating" | "error" | "welcome";

interface XiaojingMascotProps {
  state?: XiaojingState;
  pose?: "idle" | "holding-resume" | "holding-tablet" | "waving" | "404";
  expression?: "smile" | "happy" | "confused" | "thinking" | "surprised";
  size?: number;
  animate?: boolean;
  className?: string;
  speakText?: string;
}

export function XiaojingMascot({
  state = "idle",
  pose = "idle",
  expression = "smile",
  size = 180,
  animate = true,
  className,
  speakText
}: XiaojingMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 标志组件是否已挂载（Hydration 安全防护）
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 随机眨眼逻辑
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (!animate || !mounted) return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4000);
    return () => clearInterval(interval);
  }, [animate, mounted]);

  // 点击彩蛋状态："none" | "dizzy" (眩晕) | "shy" (害羞) | "salute" (敬礼)
  const [clickState, setClickState] = useState<"none" | "dizzy" | "shy" | "salute">("none");

  // 客户端视差跟随逻辑
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      // 限制偏转在 -8px 到 8px 内
      setMouseOffset({
        x: Math.max(-1, Math.min(1, dx)) * 8,
        y: Math.max(-1, Math.min(1, dy)) * 6
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  // 点击头发触发晕眩
  const handleHairClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clickState !== "none") return;
    setClickState("dizzy");
    setTimeout(() => setClickState("none"), 2000);
  };

  // 点击面部触发害羞
  const handleFaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clickState !== "none") return;
    setClickState("shy");
    setTimeout(() => setClickState("none"), 2000);
  };

  // 点击徽章/身体触发敬礼
  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clickState !== "none") return;
    setClickState("salute");
    setTimeout(() => setClickState("none"), 2500);
  };

  // 根据当前动作和点击彩蛋判定表情
  const activeExpression = clickState === "dizzy" 
    ? "dizzy"
    : clickState === "shy"
      ? "happy" 
      : state === "celebrating" || state === "welcome"
        ? "happy"
        : expression;

  // 嘴巴路径生成
  const getMouthPath = () => {
    if (state === "speaking") {
      return "M 74 118 Q 88 126 102 118"; // 说话状态的嘴巴（由 Framer Motion 控制 speakLoop 动画）
    }
    if (clickState === "dizzy") {
      return "M 80 120 Q 88 116 96 120"; // 晕眩时的扁嘴
    }
    switch (activeExpression) {
      case "happy":
        return "M 76 116 Q 88 128 100 116"; // 大笑/害羞嘴
      case "confused":
        return "M 82 122 Q 88 118 94 122"; // 扁嘴
      case "thinking":
        return "M 80 120 H 96";             // 平嘴
      case "surprised":
        return "M 80 122 C 80 126 96 126 96 122"; // 惊讶圆嘴
      default:
        return "M 78 118 Q 88 124 98 118"; // 默认微笑
    }
  };

  const showQuestion = activeExpression === "confused" || state === "error";

  // Mascot 身体动画变体
  const bodyVariants = {
    bounce: {
      y: [0, -8, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
    },
    shake: {
      x: [-1.5, 1.5, -1.5, 1.5, 0],
      transition: { duration: 0.15, repeat: Infinity }
    },
    float: {
      y: [0, -5, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const mouthVariants = {
    speakLoop: {
      d: [
        "M 78 118 Q 88 120 98 118",
        "M 78 114 Q 88 126 98 114",
        "M 80 117 Q 88 122 96 117",
        "M 78 118 Q 88 120 98 118"
      ],
      transition: { duration: 0.8, repeat: Infinity }
    }
  };

  // 视差偏转系数定义（只在挂载后视差生效，防 SSR Mismatch）
  const dx = mounted ? mouseOffset.x : 0;
  const dy = mounted ? mouseOffset.y : 0;

  return (
    <div 
      ref={containerRef}
      className={cn("relative flex flex-col items-center select-none cursor-pointer", className)} 
      style={{ width: size, height: size }}
    >
      {/* 气泡对话框 */}
      <AnimatePresence>
        {speakText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-16 bg-neutral-900/95 dark:bg-neutral-900/95 text-neutral-100 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-blue-500/20 z-20 max-w-[180px] text-center backdrop-blur-md"
          >
            <div className="relative font-medium leading-relaxed">
              {speakText}
              <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-neutral-900/95 border-r border-b border-blue-500/20 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 176 200"
        className="w-full h-full overflow-visible"
        initial={animate && mounted ? { opacity: 0, y: 10 } : false}
        animate={animate && mounted ? (state === "celebrating" || clickState === "dizzy" ? "bounce" : state === "error" ? "shake" : "float") : false}
        variants={bodyVariants}
      >
        <defs>
          {/* 小镜蓝色渐变发色 */}
          <linearGradient id="hairGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          {/* 帅气的天蓝色双重高光瞳孔渐变 */}
          <linearGradient id="eyePupilGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          {/* 宇航风衣深蓝镶边 */}
          <linearGradient id="suitBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          {/* 蔚蓝全息眼罩与光芒 */}
          <linearGradient id="visorGlass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(96,165,250,0.2)" />
            <stop offset="50%" stopColor="rgba(96,165,250,0.5)" />
            <stop offset="100%" stopColor="rgba(96,165,250,0.2)" />
          </linearGradient>
          {/* 背后飞扬披风渐变 */}
          <linearGradient id="capeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          {/* 专注全息投影背景 */}
          <linearGradient id="hologramGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0, 242, 254, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 242, 254, 0)" />
          </linearGradient>
          {/* 闪闪发光的小星星渐变 */}
          <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* 底部全息阴影环 */}
        {animate && (
          <motion.ellipse
            cx="88"
            cy="182"
            rx="46"
            ry="7"
            fill="rgba(37,99,235,0.15)"
            animate={{ scale: state === "celebrating" ? [1, 0.85, 1] : [1, 1.12, 1], opacity: [0.35, 0.15, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* 全息扫描投影 (Listening/Scanning/Welcome 状态下投射) */}
        {(state === "listening" || state === "thinking" || state === "welcome") && (
          <motion.polygon
            points="52,86 124,86 160,200 16,200"
            fill="url(#hologramGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none"
          />
        )}

        {/* 背后短斗篷/披风 (Cape) */}
        <path
          d="M 54 94 C 40 106 32 142 42 172 C 58 178 118 178 134 172 C 144 142 136 106 122 94 Z"
          fill="url(#capeGradient)"
          stroke="#1E3A8A"
          strokeWidth="0.5"
        />

        {/* 宇航外套与身体 */}
        <g>
          {/* 主身体/躯干 */}
          <path
            d="M 52 110 L 124 110 C 132 132 130 162 120 176 L 56 176 C 46 162 44 132 52 110 Z"
            fill="#FFFFFF"
            stroke="#D1D5DB"
            strokeWidth="1.5"
          />
          {/* 外套深蓝装饰线条与滚边 */}
          <path d="M 52 110 C 60 126 62 152 56 176" fill="none" stroke="url(#suitBlue)" strokeWidth="3" />
          <path d="M 124 110 C 116 126 114 152 120 176" fill="none" stroke="url(#suitBlue)" strokeWidth="3" />
          
          {/* 胸前 ZY 徽章 (带点击事件) */}
          <g onClick={handleBadgeClick}>
            <circle cx="88" cy="140" r="11" fill="url(#suitBlue)" className="cursor-pointer" />
            <circle cx="88" cy="140" r="8" fill="#FFFFFF" opacity="0.15" />
            {/* ZY 徽章字母标识 */}
            <path
              d="M 84 137 L 91 137 L 85 143 L 92 143 M 90 137 L 90 141 C 90 144 87 144 86 142"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          
          {/* 风衣衣领 */}
          <path d="M 64 110 L 88 126 L 112 110" fill="none" stroke="url(#suitBlue)" strokeWidth="2.5" />
          {/* 小脚靴子 */}
          <rect x="58" y="176" width="16" height="8" rx="3" fill="url(#suitBlue)" />
          <rect x="102" y="176" width="16" height="8" rx="3" fill="url(#suitBlue)" />
        </g>

        {/* 头部视差容器 (头发、头盔、眼罩、面部和眼睛随光标平移动画) */}
        <motion.g 
          animate={{ x: dx * 0.55, y: dy * 0.55 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* 耳罩/耳机 */}
          <circle cx="44" cy="74" r="11" fill="url(#suitBlue)" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="44" cy="74" r="7" fill="#FFFFFF" opacity="0.3" />
          <circle cx="132" cy="74" r="11" fill="url(#suitBlue)" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="132" cy="74" r="7" fill="#FFFFFF" opacity="0.3" />

          {/* 白色主头盔 (带点击事件) */}
          <ellipse 
            cx="88" 
            cy="74" 
            rx="44" 
            ry="40" 
            fill="#FFFFFF" 
            stroke="#E2E8F0" 
            strokeWidth="1.5" 
            onClick={handleFaceClick}
            className="cursor-pointer"
          />

          {/* 帅气的蓝色渐变浪花发束 (带眩晕彩蛋触发) - 支持微小独立平移体现立体错落感 */}
          <motion.g 
            animate={{ x: dx * -0.15, y: dy * -0.15 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onClick={handleHairClick} 
            className="cursor-pointer"
          >
            {/* 浪花发片底 */}
            <path
              d="M 50 50 C 54 34 72 26 88 26 C 104 26 122 34 126 50 C 118 42 104 38 88 38 C 72 38 58 42 50 50 Z"
              fill="url(#hairGradient)"
            />
            {/* 发梢1 (左翘) */}
            <path d="M 68 34 Q 74 16 82 30" fill="none" stroke="url(#hairGradient)" strokeWidth="4" strokeLinecap="round" />
            {/* 发梢2 (中翘) */}
            <path d="M 88 30 Q 92 10 98 28" fill="none" stroke="url(#hairGradient)" strokeWidth="5" strokeLinecap="round" />
            {/* 发梢3 (右翘) */}
            <path d="M 106 34 Q 114 18 118 32" fill="none" stroke="url(#hairGradient)" strokeWidth="4" strokeLinecap="round" />
          </motion.g>

          {/* 脸部红润小腮红 */}
          <ellipse cx="58" cy="80" rx="6" ry="4" fill="#F87171" opacity={clickState === "shy" ? 0.65 : 0.15} />
          <ellipse cx="118" cy="80" rx="6" ry="4" fill="#F87171" opacity={clickState === "shy" ? 0.65 : 0.15} />

          {/* 亮蓝色半透明全息眼罩 (Visor) */}
          <motion.path
            d="M 48 66 C 48 54 60 52 88 52 C 116 52 128 54 128 66 C 128 80 116 86 88 86 C 60 86 48 80 48 66 Z"
            fill="url(#visorGlass)"
            stroke="#93C5FD"
            strokeWidth="1.5"
            animate={{ x: dx * 0.1, y: dy * 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />

          {/* 眼部状态机 (双重高光大眼睛) */}
          <motion.g 
            animate={{ x: dx * 0.3, y: dy * 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {clickState === "dizzy" ? (
              // 1. 眩晕状态 (X X 眼)
              <>
                <g transform="translate(68, 70)">
                  <line x1="-5" y1="-5" x2="5" y2="5" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="5" y1="-5" x2="-5" y2="5" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
                </g>
                <g transform="translate(108, 70)">
                  <line x1="-5" y1="-5" x2="5" y2="5" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="5" y1="-5" x2="-5" y2="5" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </>
            ) : blink ? (
              // 2. 眨眼状态 (微笑闭眼线)
              <>
                <path d="M 60 72 Q 68 76 76 72" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
                <path d="M 100 72 Q 108 76 116 72" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : activeExpression === "happy" || state === "celebrating" || state === "welcome" ? (
              // 3. 开心/庆祝/害羞/欢迎眯眼笑 (> < 弯月牙眼)
              <>
                <path d="M 60 74 Q 68 64 76 74" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 100 74 Q 108 64 116 74" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : state === "listening" || state === "welcome" || activeExpression === "surprised" ? (
              // 4. 专注/扫描眼/欢迎 (微缩蔚蓝雷达同心圆 ⊙ ⊙)
              <>
                <circle cx="68" cy="70" r="7" fill="none" stroke="#00F2FE" strokeWidth="2" />
                <circle cx="68" cy="70" r="2.5" fill="#00F2FE" />
                <circle cx="108" cy="70" r="7" fill="none" stroke="#00F2FE" strokeWidth="2" />
                <circle cx="108" cy="70" r="2.5" fill="#00F2FE" />
              </>
            ) : activeExpression === "confused" || state === "error" ? (
              // 5. 困惑/错误大圆眼
              <>
                <circle cx="68" cy="70" r="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
                <circle cx="68" cy="70" r="3" fill="#EF4444" />
                <circle cx="108" cy="70" r="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
                <circle cx="108" cy="70" r="3" fill="#EF4444" />
              </>
            ) : (
              // 6. 默认/闲置 (水汪汪的萌系大眼睛 ⊙_⊙)
              <>
                {/* 左眼 */}
                <ellipse cx="68" cy="70" rx="9" ry="11" fill="#0F172A" />
                <ellipse cx="68" cy="71" rx="6.5" ry="8.5" fill="url(#eyePupilGradient)" />
                <circle cx="65.5" cy="66.5" r="3" fill="#FFFFFF" /> {/* 大高光 */}
                <circle cx="70.5" cy="73.5" r="1.2" fill="#FFFFFF" /> {/* 小高光 */}

                {/* 右眼 */}
                <ellipse cx="108" cy="70" rx="9" ry="11" fill="#0F172A" />
                <ellipse cx="108" cy="71" rx="6.5" ry="8.5" fill="url(#eyePupilGradient)" />
                <circle cx="105.5" cy="66.5" r="3" fill="#FFFFFF" /> {/* 大高光 */}
                <circle cx="110.5" cy="73.5" r="1.2" fill="#FFFFFF" /> {/* 小高光 */}
              </>
            )}
          </motion.g>

          {/* 嘴巴 (联动打字说话与各种表情) */}
          {state === "speaking" && animate ? (
            <motion.path
              d="M 78 118 Q 88 124 98 118"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={mouthVariants}
              animate="speakLoop"
            />
          ) : (
            <path d={getMouthPath()} fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
          )}

        </motion.g>

        {/* 趣味手部姿势与配饰 */}
        {clickState === "shy" ? (
          // 害羞动作：双手捂眼睛/脸颊
          <>
            <motion.circle cx="60" cy="84" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            <motion.circle cx="116" cy="84" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" animate={{ x: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </>
        ) : clickState === "salute" ? (
          // 敬礼动作：左手插腰，右手抬起贴在额头旁
          <>
            {/* 左手插腰 */}
            <path d="M 50 158 C 42 152 42 168 50 162" fill="none" stroke="url(#suitBlue)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="48" cy="160" r="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            {/* 右手敬礼臂与手 */}
            <path d="M 126 150 C 138 132 142 108 128 88" fill="none" stroke="url(#suitBlue)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="128" cy="88" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            {/* 敬礼投射出全息 ZY 圆环标志 */}
            <motion.g
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: 0.9 }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ transformOrigin: "88px 105px" }}
            >
              <ellipse cx="88" cy="105" rx="30" ry="12" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="88" y="109" fontSize="9" fill="#38BDF8" fontWeight="bold" textAnchor="middle" opacity="0.8">ZY AI</text>
            </motion.g>
          </>
        ) : pose === "holding-resume" ? (
          // 简历手执动作
          <>
            <circle cx="50" cy="158" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            {/* 简历模型纸片 */}
            <g>
              <rect x="110" y="112" width="34" height="46" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" transform="rotate(15 120 135)" />
              {/* 微缩头像与正文线 */}
              <rect x="115" y="118" width="8" height="8" rx="1.5" fill="url(#suitBlue)" transform="rotate(15 120 135)" />
              <line x1="126" y1="120" x2="136" y2="120" stroke="#E2E8F0" strokeWidth="2" transform="rotate(15 120 135)" />
              <line x1="126" y1="125" x2="138" y2="125" stroke="#E2E8F0" strokeWidth="2" transform="rotate(15 120 135)" />
              <line x1="116" y1="133" x2="138" y2="133" stroke="#F1F5F9" strokeWidth="2.2" transform="rotate(15 120 135)" />
              <line x1="116" y1="139" x2="134" y2="139" stroke="#F1F5F9" strokeWidth="2.2" transform="rotate(15 120 135)" />
              {/* 小手抓着纸片 */}
              <circle cx="116" cy="144" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            </g>
          </>
        ) : pose === "waving" ? (
          // 挥手动作
          <>
            <circle cx="50" cy="158" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <motion.g
              animate={animate && mounted ? { rotate: [0, -16, 0, -16, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "126px 146px" }}
            >
              <path d="M 126 158 C 138 142 144 126 138 116" fill="none" stroke="url(#suitBlue)" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="138" cy="114" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            </motion.g>
          </>
        ) : state === "celebrating" ? (
          // 开心举起双手
          <>
            <motion.circle cx="42" cy="132" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
            <motion.circle cx="134" cy="132" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
          </>
        ) : (
          // 默认双手垂在身侧
          <>
            <circle cx="50" cy="158" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx="126" cy="158" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          </>
        )}

        {/* 专注全息浮空控制台 (Listening/Scanning 状态下浮现) */}
        {(state === "listening" || state === "thinking" || state === "welcome") && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 科技发光面板底 */}
            <rect x="52" y="152" width="72" height="18" rx="4" fill="rgba(0, 242, 254, 0.12)" stroke="#00f2fe" strokeWidth="1.2" />
            {/* 闪烁的像素网格小按键 */}
            <circle cx="60" cy="161" r="1.5" fill="#00f2fe" />
            <circle cx="68" cy="161" r="1.5" fill="#00f2fe" />
            <circle cx="76" cy="161" r="1.5" fill="#00f2fe" />
            <rect x="83" y="160" width="8" height="2" fill="#00f2fe" />
            <rect x="95" y="158" width="12" height="6" rx="1.5" fill="none" stroke="#00f2fe" strokeWidth="0.8" />
            {/* 全息制造飘动的浮点粒子 */}
            <motion.circle cx="64" cy="148" r="1" fill="#00f2fe" animate={{ y: [0, -10], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            <motion.circle cx="108" cy="150" r="1" fill="#00f2fe" animate={{ y: [0, -12], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }} />
          </motion.g>
        )}

        {/* 眩晕小星星粒子 (dizzy 状态下在头顶旋转) */}
        {clickState === "dizzy" && (
          <g>
            <motion.path
              d="M 68 18 A 6 6 0 1 1 108 18"
              fill="none"
              stroke="#FDE047"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            {/* 旋转星1 */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "88px 24px" }}
            >
              <polygon points="88,14 89,17 92,18 89,19 88,22 87,19 84,18 87,17" fill="url(#starGradient)" />
            </motion.g>
            {/* 旋转星2 */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "88px 24px" }}
            >
              <polygon points="104,18 105,21 108,22 105,23 104,26 103,23 100,22 103,21" fill="url(#starGradient)" />
            </motion.g>
          </g>
        )}

        {/* 害羞红心粒子 (shy 状态下从身体两侧冒出飘动) */}
        {clickState === "shy" && (
          <g>
            <motion.path
              d="M 32 100 C 28 92 18 92 18 100 C 18 108 32 120 32 120 C 32 120 46 108 46 100 C 46 92 36 92 32 100 Z"
              fill="#F43F5E"
              initial={{ scale: 0.1, opacity: 0, y: 20 }}
              animate={{ scale: [0.1, 1, 0.8], opacity: [0, 0.9, 0], x: [-5, -15], y: [-10, -45] }}
              transition={{ duration: 1.6 }}
            />
            <motion.path
              d="M 144 100 C 140 92 130 92 130 100 C 130 108 144 120 144 120 C 144 120 158 108 158 100 C 158 92 148 92 144 100 Z"
              fill="#F43F5E"
              initial={{ scale: 0.1, opacity: 0, y: 20 }}
              animate={{ scale: [0.1, 1, 0.8], opacity: [0, 0.9, 0], x: [5, 15], y: [-10, -45] }}
              transition={{ duration: 1.6, delay: 0.2 }}
            />
          </g>
        )}

        {/* 惊讶/困惑符号 (Show Question Mark & Exclamation indicator) */}
        {(showQuestion || clickState === "dizzy") && (
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {/* 叹号 ! */}
            <rect x="144" y="44" width="3.5" height="12" rx="1.7" fill="#EF4444" />
            <circle cx="145.7" cy="61" r="2" fill="#EF4444" />
            {/* 疑问符 ? */}
            {showQuestion && (
              <text x="30" y="58" fontSize="16" fill="#F59E0B" fontWeight="bold">?</text>
            )}
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
}

// 辅助包装组件导出，用于兼容现有模块调用
export function XiaojingUploadMascot(props: Omit<XiaojingMascotProps, "pose" | "expression">) {
  return <XiaojingMascot {...props} pose="holding-resume" expression="smile" />;
}

export function Xiaojing404Mascot(props: Omit<XiaojingMascotProps, "pose" | "expression">) {
  return <XiaojingMascot {...props} pose="404" expression="confused" />;
}

export function XiaojingWaveMascot(props: Omit<XiaojingMascotProps, "pose" | "expression">) {
  return <XiaojingMascot {...props} pose="waving" expression="happy" />;
}

export function XiaojingThinkingMascot(props: Omit<XiaojingMascotProps, "pose" | "expression">) {
  return <XiaojingMascot {...props} pose="holding-tablet" expression="thinking" />;
}
