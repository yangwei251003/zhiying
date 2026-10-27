import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F1FB",
          100: "#B5D4F4",
          200: "#85B7EB",
          300: "#5B9AE0",
          400: "#378ADD",
          500: "#1F6FBF",
          600: "#185FA5",
          700: "#0F4F8C",
          800: "#0C447C",
          900: "#042C53",
          950: "#031E36",
        },
        accent: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA8C",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
        md: "0 4px 12px rgba(15, 23, 42, 0.08)",
        lg: "0 12px 32px rgba(15, 23, 42, 0.12)",
        glow: "0 0 0 4px rgba(31, 111, 191, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans-sc)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
