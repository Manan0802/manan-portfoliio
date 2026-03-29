/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        'primary': '#3B82F6',
        'secondary': '#8B5CF6',
        'tertiary': '#06B6D4',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px #3B82F6, 0 0 20px #3B82F6',
          },
          '50%': {
            boxShadow: '0 0 20px #3B82F6, 0 0 40px #3B82F6',
          },
        },
      },
    },
  },
  plugins: [],
}
