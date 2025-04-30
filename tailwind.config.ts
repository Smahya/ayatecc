import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
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
        white: "#FFFFFF",
        black: "#000000",
        neutral: {
          950: "#0E121B",
          900: "#191B25",
          800: "#232530",
          700: "#2B303B",
          600: "#525B66",
          500: "#717784",
          400: "#999DAE",
          300: "#CACFDB",
          200: "#E0E4EA",
          100: "#F3F5F8",
          50: "#F5F7FA",
          0: "#FFFFFF",
        },
        blue: {
          700: "#2547D0",
          500: "#335CFF",
          50: "#EBF1FF",
        },
        green: {
          500: "#21C16B",
          100: "#D1F8E9",
        },
        red: {
          500: "#F83748",
          100: "#FFD5D8",
        },
      },
      fontSize: {
        "2xl": "24px",
        xl: "20px",
        base: "16px",
        sm: "14px",
        xs: "12px",
      },
      letterSpacing: {
        tighter: "-0.5px",
        tight: "-0.3px",
        snug: "-0.2px",
      },
      boxShadow: {
        custom: "0px 8px 12px rgba(240, 240, 240, 0.6)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        notoSerif: ["var(--font-noto-serif)"],
        sourceCodePro: ["var(--font-source-code-pro)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
