import type { Metadata } from 'next';
import '../styles/globals.css';
import { ReduxProvider } from '@/providers/ReduxProvider';
import AntdProvider from '@/providers/AntProvider';
import AuthProvider from '@/providers/AuthProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://recoco.pro'),
  title: 'Recoco',
  description: 'A simple and fast way to comment your courses',
  keywords: ['recomendaciones cursos', 'recoco'],
  openGraph: {
    images: '/images/og.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <AntdProvider>{children}</AntdProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
