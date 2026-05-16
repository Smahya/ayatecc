import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F7F8",
        paper: "#FFFFFF",
        ink: {
          DEFAULT: "#0F172A",
          80: "#1E293B",
          60: "#475569",
        },
        accent: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          soft: "#EEF2FF",
        },
        mute: {
          DEFAULT: "#64748B",
          soft: "#94A3B8",
          line: "#E2E8F0",
        },
        danger: "#DC2626",
        success: "#059669",
        // legacy aliases — kept so any stray usages still resolve
        bone: "#F6F7F8",
        signal: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          ink: "#FFFFFF",
        },
        neutral: {
          950: "#0F172A",
          900: "#1E293B",
          800: "#334155",
          700: "#475569",
          600: "#64748B",
          500: "#94A3B8",
          400: "#CBD5E1",
          300: "#E2E8F0",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
          0: "#FFFFFF",
        },
        blue: {
          700: "#4338CA",
          500: "#4F46E5",
          50: "#EEF2FF",
        },
        green: {
          500: "#059669",
          100: "#D1FAE5",
        },
        red: {
          500: "#DC2626",
          100: "#FEE2E2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        inter: ["var(--font-sans)"],
      },
      fontSize: {
        "5xl": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "4xl": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "2xl": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        xl: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        base: ["1rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.45" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
      },
      letterSpacing: {
        tighter: "-0.025em",
        tight: "-0.015em",
        snug: "-0.01em",
        mono: "0.02em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px -4px rgba(15,23,42,0.08)",
        ticket:
          "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px -4px rgba(15,23,42,0.08)",
        accent: "0 8px 24px -8px rgba(79,70,229,0.45)",
        custom:
          "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px -4px rgba(15,23,42,0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        spin: "spin 0.9s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
