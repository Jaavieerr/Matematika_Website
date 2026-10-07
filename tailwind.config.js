/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9f6ee',
        foreground: '#23201d',
        primary: {
          DEFAULT: '#7350b5',
          foreground: '#ffffff',
          dark: '#583794',
          light: '#f1ecf9'
        },
        secondary: {
          DEFAULT: '#ebe4f8',
          foreground: '#583794'
        },
        accent: {
          DEFAULT: '#faecc2',
          foreground: '#6d5a1b'
        },
        card: '#ffffff',
        border: '#e7e2d7',
        muted: {
          DEFAULT: '#f3efe6',
          foreground: '#746e63'
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
