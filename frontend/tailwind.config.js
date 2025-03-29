/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        card: 'hsl(var(--card))',
        'card-hover': 'hsl(var(--card-hover))',
        muted: 'hsl(var(--muted))',
        'muted-hover': 'hsl(var(--muted-hover))',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
        glow: 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '20px 20px',
      },
    },
  },
  plugins: [],
};