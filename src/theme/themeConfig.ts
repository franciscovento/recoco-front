import { ThemeConfig } from 'antd';
import themeStyles from './themeStyles.json';
import { Inter } from 'next/font/google';

const nunito = Inter({
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  subsets: ['latin'],
});

export const theme: ThemeConfig = {
  cssVar: {
    prefix: 'antd',
  },
  token: {
    colorPrimary: themeStyles.colors['app-primary'],
    fontFamily: nunito.style.fontFamily,
  },
  components: {
    Modal: {
      marginSM: 0,
      borderRadiusLG: 12,
    },

    Button: {
      contentFontSizeSM: 12,
      borderRadius: 24,
      borderRadiusSM: 24,
      borderRadiusLG: 24,
    },
    Input: {
      borderRadius: 12,
      borderRadiusLG: 24,
      borderRadiusSM: 8,
    },
  },
};
