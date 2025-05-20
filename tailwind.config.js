const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          50: 'var(--color-primary-50)',
        },
        accent: 'var(--color-accent)',
        gray: {
          900: 'var(--color-gray-900)',
          500: 'var(--color-gray-500)',
        },
        surface: 'var(--color-surface)'
      }
    },
  },
  plugins: [],
}
