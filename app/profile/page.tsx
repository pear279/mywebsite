import Link from "next/link";
import { Brand } from "@/components/Brand";
import { asset } from "@/data/projects";
export default function ProfilePage() {
  return (
    <main>
      <header className="case-nav wrap">
        <Link href="/" aria-label="返回首页">
          <Brand compact />
        </Link>
        <Link href="/#about">← 返回个人介绍</Link>
      </header>
      <section className="card">
        <span className="eyebrow">LI HUIZHEN / CLASS OF 2027</span>
        <h1>李慧珍</h1>
        <p>
          南京大学建筑学硕士，2027 届。专注 AI
          产品，关注市场、运营与数据。从用户研究、需求定义与交互设计，到 AI
          辅助开发和模型评测，习惯亲手验证一个想法。
        </p>
        <h2>我如何工作</h2>
        <p>
          研究真实场景，把零散反馈整理成清晰问题；设计规则和交互，让系统服务于用户任务；用原型、代码和数据，检验产品判断。
        </p>
        <h2>联系我</h2>
        <p>
          <a href="mailto:3500788359@qq.com">3500788359@qq.com</a>
          <br />
          <a href="tel:+8615952105455">159 5210 5455</a>
          <br />
          <a href="https://github.com/pear279" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </p>
        <p style={{ marginTop: 30 }}>
          <a href={asset("/resume.pdf")} target="_blank" rel="noreferrer">
            查看完整简历 ↗
          </a>
        </p>
      </section>
    </main>
  );
}
