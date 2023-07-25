import colors from 'tailwindcss/colors';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}',],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        success: colors.emerald,
        warn: colors.amber,
        danger: colors.red,
        muted: colors.slate['200'],
      }
    },
  },
  plugins: [
    // https://github.com/adoxography/tailwind-scrollbar#configuration
    scrollbar({ nocompatible: true })
  ],
}

