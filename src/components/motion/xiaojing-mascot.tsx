"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type XiaojingExpression = "smile" | "confused" | "thinking" | "surprised" | "happy";
export type XiaojingPose = "standing" | "holding-resume" | "holding-tablet" | "404" | "waving";

interface XiaojingMascotProps {
  className?: string;
  expression?: XiaojingExpression;
  pose?: XiaojingPose;
  size?: number;
  animate?: boolean;
}

/**
 * 职映小镜 —— 可拆解、可动画的 SVG IP 组件
 *
 * 拆解元素：
 * - 头部/护目镜（带扫描光效）
 * - 耳机（带脉冲光环）
 * - 蓝色头发/刘海
 * - 眼睛（支持表情）
 * - 身体/白大褂
 * - 蓝色披风（带飘动）
 * - 手持物（简历/平板/放大镜）
 */
export function XiaojingMascot({
  className,
  expression = "smile",
  pose = "standing",
  size = 200,
  animate = true,
}: XiaojingMascotProps) {
  // 眼睛形态根据表情变化
  const eyeScaleY = expression === "surprised" ? 1.25 : expression === "happy" ? 0.7 : 1;
  const mouthPath =
    expression === "smile"
      ? "M 72 118 Q 88 128 104 118"
      : expression === "happy"
      ? "M 72 116 Q 88 132 104 116"
      : expression === "confused"
      ? "M 78 124 Q 88 120 98 124"
      : expression === "thinking"
      ? "M 80 122 Q 88 124 96 122"
      : "M 78 120 Q 88 128 98 120";

  const showTeardrop = expression === "confused" || expression === "thinking";
  const showQuestion = expression === "confused";

  return (
    <motion.svg
      viewBox="0 0 176 200"
      width={size}
      height={size}
      className={cn("overflow-visible", className)}
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <defs>
        {/* 品牌蓝渐变 */}
        <linearGradient id="brandBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B9AE0" />
          <stop offset="100%" stopColor="#1F6FBF" />
        </linearGradient>
        <linearGradient id="brandBlueDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#185FA5" />
          <stop offset="100%" stopColor="#0F4F8C" />
        </linearGradient>
        <linearGradient id="visorGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(91,154,224,0.25)" />
          <stop offset="50%" stopColor="rgba(91,154,224,0.45)" />
          <stop offset="100%" stopColor="rgba(91,154,224,0.25)" />
        </linearGradient>
        <linearGradient id="hairGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B9AE0" />
          <stop offset="100%" stopColor="#1F6FBF" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDBA8C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 整体悬浮动画 */}
      <motion.g
        animate={animate ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 背景光环 */}
        {animate && (
          <motion.ellipse
            cx="88"
            cy="180"
            rx="56"
            ry="8"
            fill="rgba(31,111,191,0.12)"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* 披风（在身体后方） */}
        <motion.path
          d="M 56 92 C 44 110 38 148 48 178 C 64 184 112 184 128 178 C 138 148 132 110 120 92 Z"
          fill="url(#brandBlueDark)"
          animate={animate ? { d: [
            "M 56 92 C 44 110 38 148 48 178 C 64 184 112 184 128 178 C 138 148 132 110 120 92 Z",
            "M 56 92 C 42 112 34 150 46 180 C 64 186 112 186 130 180 C 142 150 134 112 120 92 Z",
            "M 56 92 C 44 110 38 148 48 178 C 64 184 112 184 128 178 C 138 148 132 110 120 92 Z",
          ]} : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 身体/白大褂 */}
        <path
          d="M 68 96 L 56 110 L 52 168 C 52 174 58 178 64 178 L 112 178 C 118 178 124 174 124 168 L 120 110 L 108 96 Z"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        {/* 衣领 */}
        <path d="M 88 96 L 76 116 L 88 124 L 100 116 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        {/* 左衣襟 */}
        <path d="M 88 124 L 76 116 L 60 170 L 88 170 Z" fill="#F1F5F9" />
        {/* 右衣襟 */}
        <path d="M 88 124 L 100 116 L 116 170 L 88 170 Z" fill="#FFFFFF" />
        {/* 胸前 Logo 徽章 */}
        <circle cx="88" cy="134" r="10" fill="url(#brandBlue)" />
        <text x="88" y="137.5" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">ZY</text>
        {/* 腰带/纽扣 */}
        <circle cx="88" cy="150" r="2.5" fill="#CBD5E1" />
        <circle cx="88" cy="158" r="2.5" fill="#CBD5E1" />

        {/* 左手臂 */}
        <path
          d="M 56 110 C 46 124 44 146 50 156 C 54 160 60 158 62 152"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 56 110 C 46 124 44 146 50 156 C 54 160 60 158 62 152"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* 右手臂 */}
        <path
          d="M 120 110 C 130 124 132 146 126 156 C 122 160 116 158 114 152"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 120 110 C 130 124 132 146 126 156 C 122 160 116 158 114 152"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* 手套/手掌 */}
        <circle cx="50" cy="158" r="7" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="126" cy="158" r="7" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

        {/* 头部 */}
        <ellipse cx="88" cy="72" rx="44" ry="40" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

        {/* 耳机 */}
        <path
          d="M 44 72 C 44 48 60 32 88 32 C 116 32 132 48 132 72"
          fill="none"
          stroke="#1F6FBF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="38" y="60" width="12" height="24" rx="6" fill="url(#brandBlue)" />
        <rect x="126" y="60" width="12" height="24" rx="6" fill="url(#brandBlue)" />
        {/* 耳机脉冲光环 */}
        {animate && (
          <>
            <motion.ellipse
              cx="44"
              cy="72"
              rx="12"
              ry="18"
              fill="none"
              stroke="#5B9AE0"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.ellipse
              cx="132"
              cy="72"
              rx="12"
              ry="18"
              fill="none"
              stroke="#5B9AE0"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            />
          </>
        )}

        {/* 蓝色头发 */}
        <path
          d="M 52 52 C 56 36 72 28 88 28 C 104 28 120 36 124 52 C 116 44 104 40 88 40 C 72 40 60 44 52 52 Z"
          fill="url(#hairGradient)"
        />
        <path
          d="M 70 34 L 76 18 L 84 32 Z"
          fill="url(#hairGradient)"
        />
        <path
          d="M 88 30 L 92 14 L 100 32 Z"
          fill="url(#hairGradient)"
        />
        <path
          d="M 106 34 L 116 20 L 120 36 Z"
          fill="url(#hairGradient)"
        />

        {/* 护目镜 */}
        <path
          d="M 50 64 C 50 52 62 50 88 50 C 114 50 126 52 126 64 C 126 78 114 84 88 84 C 62 84 50 78 50 64 Z"
          fill="url(#visorGlass)"
          stroke="#5B9AE0"
          strokeWidth="2"
        />
        {/* 护目镜高光扫描 */}
        {animate && (
          <motion.path
            d="M 54 64 L 122 64"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* 眼睛 */}
        <motion.g
          animate={animate ? { scaleY: [1, eyeScaleY, 1, eyeScaleY, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.15, 1] }}
          style={{ transformOrigin: "88px 72px" }}
        >
          <ellipse cx="72" cy="72" rx="8" ry="10" fill="#0F4F8C" />
          <ellipse cx="104" cy="72" rx="8" ry="10" fill="#0F4F8C" />
          <circle cx="74" cy="70" r="3" fill="white" />
          <circle cx="106" cy="70" r="3" fill="white" />
        </motion.g>

        {/* 嘴巴 */}
        <path d={mouthPath} fill="none" stroke="#0F4F8C" strokeWidth="2" strokeLinecap="round" />

        {/* 思考/疑惑汗滴 */}
        {showTeardrop && (
          <motion.path
            d="M 124 48 Q 128 42 128 50 Q 128 56 124 48"
            fill="#5B9AE0"
            animate={animate ? { y: [0, 2, 0], opacity: [1, 0.6, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {showQuestion && (
          <motion.text
            x="132"
            y="44"
            fontSize="14"
            fill="#F97316"
            fontWeight="bold"
            animate={animate ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ?
          </motion.text>
        )}

        {/* 手持物：简历/平板 */}
        {(pose === "holding-resume" || pose === "holding-tablet") && (
          <motion.g
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "88px 140px" }}
          >
            <rect
              x="64"
              y="126"
              width="48"
              height="64"
              rx="5"
              fill="white"
              stroke="#CBD5E1"
              strokeWidth="1"
              transform="rotate(-8 88 158)"
            />
            <rect
              x="68"
              y="132"
              width="14"
              height="14"
              rx="3"
              fill="url(#brandBlue)"
              transform="rotate(-8 88 158)"
            />
            <rect
              x="86"
              y="134"
              width="20"
              height="3"
              rx="1.5"
              fill="#E2E8F0"
              transform="rotate(-8 88 158)"
            />
            <rect
              x="86"
              y="142"
              width="16"
              height="3"
              rx="1.5"
              fill="#E2E8F0"
              transform="rotate(-8 88 158)"
            />
            <rect
              x="70"
              y="154"
              width="32"
              height="3"
              rx="1.5"
              fill="#F1F5F9"
              transform="rotate(-8 88 158)"
            />
            <rect
              x="70"
              y="162"
              width="28"
              height="3"
              rx="1.5"
              fill="#F1F5F9"
              transform="rotate(-8 88 158)"
            />
            {/* 小星星装饰 */}
            <motion.path
              d="M 120 128 L 122 134 L 128 136 L 122 138 L 120 144 L 118 138 L 112 136 L 118 134 Z"
              fill="url(#accentGradient)"
              animate={animate ? { scale: [1, 1.2, 1], rotate: [0, 15, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "120px 136px" }}
            />
          </motion.g>
        )}

        {/* 404 姿势：手持放大镜 */}
        {pose === "404" && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <circle
              cx="52"
              cy="146"
              r="16"
              fill="none"
              stroke="#1F6FBF"
              strokeWidth="3"
            />
            <line
              x1="40"
              y1="162"
              x2="48"
              y2="156"
              stroke="#1F6FBF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* 放大镜扫描线 */}
            {animate && (
              <motion.circle
                cx="52"
                cy="146"
                r="10"
                fill="none"
                stroke="#5B9AE0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "52px 146px" }}
              />
            )}
          </motion.g>
        )}

        {/* 挥手姿势 */}
        {pose === "waving" && (
          <motion.g
            animate={animate ? { rotate: [0, -12, 0, -8, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "120px 110px" }}
          >
            <circle cx="126" cy="106" r="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <path
              d="M 116 100 L 122 94 M 120 104 L 128 96 M 124 108 L 134 102"
              stroke="#1F6FBF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        )}
      </motion.g>
    </motion.svg>
  );
}

// 便捷变体导出
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
