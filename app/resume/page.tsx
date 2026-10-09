import Link from "next/link";
import { Brand } from "@/components/Brand";
import { asset } from "@/data/projects";
export default function ResumePage() {
  return (
    <main>
      <header className="case-nav wrap">
        <Link href="/" aria-label="返回首页">
          <Brand compact />
        </Link>
        <Link href="/">← 返回首页</Link>
        <a href={asset("/resume.pdf")} download>
          下载简历 ↓
        </a>
      </header>
      <section className="card">
        <span className="eyebrow">RESUME / 2026</span>
        <h1>简历。</h1>
        <p>
          李慧珍 · 南京大学建筑学硕士 · 2027 届<br />
          AI 产品 / 市场 / 运营 / 数据
        </p>
        <p style={{ margin: "25px 0" }}>
          <a href={asset("/resume.pdf")} target="_blank" rel="noreferrer">
            在新窗口打开 PDF ↗
          </a>
        </p>
        <object
          data={asset("/resume.pdf")}
          type="application/pdf"
          width="100%"
          height="850"
          aria-label="李慧珍的个人简历"
        >
          <p>
            你的浏览器无法内嵌显示 PDF。
            <a href={asset("/resume.pdf")}>打开简历</a>
          </p>
        </object>
      </section>
    </main>
  );
}
