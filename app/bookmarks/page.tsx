import Link from "next/link";
import { Brand } from "@/components/Brand";
import { bookmarkCategories } from "@/data/bookmarks";

export default function BookmarksPage() {
  return (
    <main>
      <header className="case-nav wrap">
        <Link href="/" aria-label="返回首页">
          <Brand compact />
        </Link>
        <Link href="/">← 返回首页</Link>
      </header>
      <section className="card">
        <h1>收藏链接</h1>
        <p>按分类整理，点击可在新窗口打开。</p>

        {bookmarkCategories.map((group) => (
          <div key={group.category} className="bookmarkGroup">
            <h2>{group.category}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                  <span> — {link.note}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
