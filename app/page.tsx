import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="card">
      <h1>你好，我是李慧珍</h1>
      <p>欢迎来到我的个人网站，这里会展示我的个人资料、简历和学习收藏链接。</p>
      <div className="ctaRow">
        <Link href="/profile" className="btn">查看个人资料</Link>
        <Link href="/resume" className="btn secondary">查看简历</Link>
        <Link href="/bookmarks" className="btn secondary">查看收藏链接</Link>
      </div>
    </section>
  );
}
