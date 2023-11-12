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
        'app-secondary': '',
        'app-accent': '',
        'app-text': '',
      },
    },
  },
  plugins: [],
};
export default config;
