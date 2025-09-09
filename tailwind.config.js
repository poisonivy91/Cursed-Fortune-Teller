/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
  fontFamily: { display: ['Cinzel','serif'], body: ['Cormorant','serif'] },
      keyframes: {
        smoke: { from:{opacity:.1, transform:'translateY(10px) scale(1.02)'}, to:{opacity:.5, transform:'translateY(-10px) scale(1.08)'} },
        glitch: {
          '0%': { clipPath: 'inset(0 0 0 0)' },
          '20%': { clipPath: 'inset(10% 0 15% 0)' },
          '40%': { clipPath: 'inset(0 0 20% 0)' },
          '60%': { clipPath: 'inset(15% 0 5% 0)' },
          '80%': { clipPath: 'inset(5% 0 15% 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' }
        },
        drift: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(40%)' } },
        sweep: { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(220%)' } },
      },
      animation: {
        smoke: 'smoke 6s ease-in-out infinite alternate',
        glitch: 'glitch 1.4s infinite',
        drift: 'drift 18s linear infinite',
        sweep: 'sweep 1.4s ease-in-out',
      },
      boxShadow: {
        'neon': '0 0 40px rgba(168, 85, 247, .35)'
      }
    },
  },
  plugins: [],
}
