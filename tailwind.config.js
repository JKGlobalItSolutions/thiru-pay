/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#0A1F44',
          royal: '#163A7A',
          light: '#1E4D99',
          50: '#E8EDF6',
        },
        orange: {
          brand: '#FF6B00',
          light: '#FF8C33',
          pale: '#FFF3E0',
          50: '#FFF8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        glow: 'glow 3s ease-in-out infinite',
        'pulse-orange': 'pulseOrange 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'phone-float': 'floatPhone 5s ease-in-out infinite',
        'card-float-1': 'floatCard1 4s ease-in-out infinite',
        'card-float-2': 'floatCard2 5s ease-in-out infinite',
        'card-float-3': 'floatCard3 6s ease-in-out infinite',
        'card-float-4': 'floatCard1 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatPhone: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        floatCard1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatCard2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        floatCard3: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 0, 0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(255, 107, 0, 0.7)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 0, 0.4)' },
          '70%': { boxShadow: '0 0 0 12px rgba(255, 107, 0, 0)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A1F44 0%, #163A7A 50%, #0A1F44 100%)',
        'orange-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8C33 100%)',
      },
      boxShadow: {
        'orange-glow': '0 0 30px rgba(255, 107, 0, 0.4)',
        'orange-sm': '0 4px 20px rgba(255, 107, 0, 0.3)',
        glass: '0 8px 32px rgba(10, 31, 68, 0.15)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        premium: '0 20px 60px rgba(10, 31, 68, 0.2)',
      },
    },
  },
  plugins: [],
};
