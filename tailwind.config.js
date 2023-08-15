import colors from 'tailwindcss/colors';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        basic: colors.gray,
        primary: colors.indigo,
        accent: colors.sky,
        success: colors.emerald,
        warn: colors.amber,
        danger: colors.red,
        muted: colors.slate['200'],
      },
    },
  },
  plugins: [
    // https://github.com/adoxography/tailwind-scrollbar#configuration
    scrollbar({ nocompatible: true }),
  ],
  purge: {
    options: {
      safelist: ['pr-12', 'rotate-180', 'transition-transform'],
    },
  },
};
