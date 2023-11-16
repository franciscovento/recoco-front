import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-primary': '#00DC8C',
        'app-primary-accent': '#30E5BA',
        'app-primary-dark': '#0B8F5F',
        'app-secondary': '',
        'app-accent': '',
        'app-text': '#868686',
        'app-title': '#404040',
        'app-background': '#F4F5F7',
      },
      boxShadow: {
        'app-card':
          '2.17893px 2.17893px 6.5368px 0px rgba(174, 174, 192, 0.40)',
        'app-teacher-class': '0px 1px 4px 0px rgba(174, 174, 192, 0.30)',
      },
    },
  },
  plugins: [],
};
export default config;
