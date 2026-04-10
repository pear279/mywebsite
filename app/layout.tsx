import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/SiteNav';

export const metadata: Metadata = {
  title: '个人展示网站',
  description: '个人资料、简历与收藏链接展示'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteNav />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
