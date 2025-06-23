import { theme } from '@/theme/themeConfig';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider } from 'antd';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const AntdProvider: FC<Props> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
