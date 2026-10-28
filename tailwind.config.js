/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#1b4332',
          950: '#0f241c',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e5ebe5',
          200: '#ccd8cc',
          300: '#a8bea8',
          400: '#8a9a86',
          500: '#6d7f69',
          600: '#566653',
          700: '#455142',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f7f4ee',
          200: '#f0eade',
          300: '#e5dcce',
          400: '#d5c7b3',
        },
        gold: {
          100: '#fdf6e6',
          200: '#fae8be',
          300: '#f4d58d',
          400: '#e5c158',
          500: '#c5a880',
          600: '#b89445',
          700: '#8a6e30',
        },
        charcoal: {
          700: '#3d443f',
          800: '#2d312e',
          900: '#1f2420',
          950: '#141815',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(27, 67, 50, 0.05)',
        'card': '0 15px 35px -5px rgba(27, 67, 50, 0.08), 0 5px 15px rgba(0,0,0,0.03)',
      }
    },
  },
  plugins: [],
};

