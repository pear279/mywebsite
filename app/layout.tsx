import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CursorRipple } from "@/components/CursorRipple";
export const metadata: Metadata = {
  title: "pear 279 · 李慧珍 | AI 产品与创意实践",
  description:
    "李慧珍的个人作品集。建筑学背景，专注 AI 产品，从用户研究、体验设计到开发验证，探索市场、运营与数据。",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg` },
  openGraph: {
    title: "pear 279 · 李慧珍",
    description: "理性地构建，感性地观察。AI 产品与创意实践。",
    type: "website",
    locale: "zh_CN",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}<CursorRipple /></body>
    </html>
  );
}
