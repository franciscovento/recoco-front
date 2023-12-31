import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        'app-primary': '#00DC8C',
        'app-primary-accent': '#30E5BA',
        'app-primary-dark': '#2FB584',
        'app-secondary': '#114230',
        'app-accent': '#2FB584',
        'app-text': '#868686',
        'app-title': '#404040',
        'app-background': '#F4F5F7',
        'app-border': '#E8E8EC',
      },
      boxShadow: {
        'app-card':
          '2.17893px 2.17893px 6.5368px 0px rgba(174, 174, 192, 0.40)',
        'app-teacher-class': '0px 1px 4px 0px rgba(174, 174, 192, 0.30)',
      },
      animation: {
        'app-fade-in': 'fadeIn 0.5s ease-in-out',
        'app-fade-out': 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
export default config;
