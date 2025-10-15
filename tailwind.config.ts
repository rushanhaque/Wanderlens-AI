import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        calm: {
          50: "#FEFEFE",
          100: "#F8F6F0",
          200: "#F0EDE5",
          300: "#E8E4D9",
          400: "#D4C9B1",
          500: "#C4B896",
          600: "#B8A882",
          700: "#9A8B6B",
          800: "#7A6F56",
          900: "#5A5241",
        },
        olive: {
          50: "#F7F8F3",
          100: "#EDF0E6",
          200: "#DCE2CC",
          300: "#C4D0A8",
          400: "#A8B87E",
          500: "#8FA05C",
          600: "#6B7A45",
          700: "#525F36",
          800: "#414A2C",
          900: "#363E25",
        },
        accent: {
          beige: "#F5F1E8",
          cream: "#FDFCF7",
          sage: "#9CAF88",
          charcoal: "#2C2C2C",
          warm: "#D4C4A8",
        },
      },
      boxShadow: {
        glow: "0 0 24px rgba(156,175,136,0.25)",
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        calm: "0 8px 32px rgba(156,175,136,0.15)",
        depth: "0 12px 40px rgba(0,0,0,0.12)",
      },
      dropShadow: {
        glow: "0 0 8px rgba(156,175,136,0.35)",
        soft: "0 2px 8px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "glow-grid":
          "linear-gradient(180deg, rgba(10,12,28,0.9), rgba(10,12,28,0.95)), radial-gradient(circle at 20% -10%, rgba(122,92,255,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(0,229,255,0.22), transparent 35%)",
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};
export default config;
