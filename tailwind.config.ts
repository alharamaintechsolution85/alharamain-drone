import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bde6ff',
          300: '#8fd4ff',
          400: '#5ebdff',
          500: '#2d9dfd',
          600: '#117fe7',
          700: '#0d63b0',
          800: '#0e4d8d',
          900: '#123d6a'
        }
      },
      boxShadow: {
        soft: '0 18px 40px rgba(13, 99, 176, 0.12)'
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at center, rgba(96,165,250,0.25), transparent 55%)'
      }
    }
  },
  plugins: []
};

export default config;
