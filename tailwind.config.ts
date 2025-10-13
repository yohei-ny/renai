import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // カスタムカラー（UIデザインに合わせたグラデーション）
        'pink-soft': '#FFE4E8',
        'pink-medium': '#FFB8C6',
        'blue-sky': '#87CEEB',
        'purple-soft': '#E6D5F5',
      },
      backgroundImage: {
        'gradient-romantic': 'linear-gradient(180deg, #FFE4E8 0%, #FFEEF1 50%, #FFF5F7 100%)',
        'gradient-sky': 'linear-gradient(180deg, #4A90E2 0%, #87CEEB 100%)',
        'gradient-dreamy': 'linear-gradient(180deg, #87CEEB 0%, #FFB8C6 50%, #E6D5F5 100%)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Hiragino Sans', 'Yu Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
