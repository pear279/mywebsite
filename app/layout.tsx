import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'pear279 · 李慧珍｜AI 产品经理',
  description: '李慧珍的 AI 产品经理个人作品集：工作经历、产品项目、技能与联系方式。',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0d0c',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.25/dist/lenis.css" />
      </head>
      <body>
        {children}
        <Script src="https://unpkg.com/lenis@1.3.25/dist/lenis.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
