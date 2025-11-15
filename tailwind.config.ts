import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 品牌色彩系統（基於 LOGO）
        brand: {
          red: '#B8382D',         // 主色 - 品牌紅
          'red-light': '#D14639', // 淺紅
          'red-dark': '#8F2C23',  // 深紅
          gold: '#D4AF37',        // 副色 - 金色
          'gold-light': '#E8C85A',// 淺金
          'gold-dark': '#B8962E', // 深金
          gray: '#333333',        // 文字色 - 深灰
          lightGray: '#F5F5F5',   // 背景色 - 淺灰
        },
        // 深色階
        dark: {
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2D2D2D',
          600: '#404040',
        },
        // 灰階
        gray: {
          50: '#F8F8F8',
          100: '#F0F0F0',
          200: '#E5E5E5',
          300: '#D1D1D1',
          400: '#A8A8A8',
          500: '#8A8A8A',
          600: '#606060',
          700: '#4A4A4A',
          800: '#2D2D2D',
          900: '#1A1A1A',
        },
        // shadcn/ui 色彩系統
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        'brand': '0 10px 40px -10px rgba(184, 56, 45, 0.3)',
        'brand-lg': '0 20px 60px -15px rgba(184, 56, 45, 0.4)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'Noto Sans TC',
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
