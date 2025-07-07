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
        'blue': {
          300: '#2563eb', // Azul medio-oscuro
          400: '#1e40af', // Azul más oscuro para reemplazar el blue-400 original (antes era #1a56db)
          500: '#1e3a8a', // Azul mucho más oscuro para reemplazar el blue-500 original (antes era #1e429f)
          600: '#172554', // Azul muy oscuro adicional
          700: '#0f172a', // Azul extremadamente oscuro
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards'
      }
    },
  },
  plugins: [],
}
