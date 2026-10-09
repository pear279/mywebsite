import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, asset } from "@/data/projects";
import { caseDepth } from "@/data/case-depth";
import { Brand } from "@/components/Brand";
import { ProjectVisual } from "@/components/ProjectVisual";
import type { Metadata } from "next";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = projects.find((p) => p.slug === params.slug);
  return {
    title: p ? `${p.title} · pear 279` : "作品 · pear 279",
    description: p?.description,
  };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projects.find((p) => p.slug === params.slug);
  if (!p) notFound();
  const depth = caseDepth[p.slug];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main className="case-page">
      <header className="case-nav wrap">
        <Link href="/" aria-label="返回首页">
          <Brand compact />
        </Link>
        <Link href="/#work">← 全部作品</Link>
        <a href={p.repo} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </header>
      <section className="case-intro wrap">
        <span className="eyebrow">
          {p.category} / {p.year}
        </span>
        <h1>
          {p.title}
          <span>{p.chinese}</span>
        </h1>
        <h2>{p.tagline}</h2>
        <div className="case-summary">
          <p>{p.description}</p>
          <div>
            <span className="eyebrow">MY ROLE</span>
            <p>{p.role}</p>
            <div className="case-links">
              <a href={p.repo} target="_blank" rel="noreferrer">
                查看代码 ↗
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer">
                  在线体验 ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="case-cover wrap">
        <ProjectVisual project={p} large />
      </div>
      <section className="case-body wrap">
        <div className="case-metrics">
          {p.metrics.map(([n, l]) => (
            <div key={n}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div className="case-section">
          <span className="eyebrow">THE QUESTION</span>
          <div>
            <h2>从一个真实问题开始。</h2>
            <p>{p.problem}</p>
          </div>
        </div>
        <div className="case-section">
          <span className="eyebrow">RESEARCH → EXPERIENCE</span>
          <div><h2>把观察变成一条产品路径。</h2><p>{depth.research}</p><div className="case-process">{depth.flow.map((step, i) => <span key={step}>{String(i + 1).padStart(2, "0")} / {step}</span>)}</div></div>
        </div>
        <div className="case-section">
          <span className="eyebrow">PRODUCT DECISIONS</span>
          <div>
            <h2>关键的取舍。</h2>
            {p.decisions.map((d, i) => (
              <article className="decision" key={d.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        {p.images.length > 1 && (
          <div className="case-gallery">
            {p.images.map((im, i) => (
              <figure key={im}>
                <img
                  src={asset(`/media/${im}.webp`)}
                  alt={`${p.title} 产品界面 ${i + 1}`}
                  loading="lazy"
                />
                <figcaption>
                  界面记录 / {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {p.slug === "koala-pet" && (
          <figure className="case-desktop">
            <img
              src={asset("/media/koala-screen.webp")}
              alt="Koala Pet 桌宠插件与状态设置界面"
              loading="lazy"
            />
            <figcaption>插件设置与角色预览 / 实际产品界面</figcaption>
          </figure>
        )}
        <div className="case-section">
          <span className="eyebrow">BUILD & REFLECT</span>
          <div><h2>机制、边界与下一步。</h2><div className="case-detail-grid"><article><span className="eyebrow">01 / IMPLEMENTATION</span><h3>设计如何落实</h3><p>{depth.implementation}</p></article><article><span className="eyebrow">02 / NEXT VALIDATION</span><h3>继续验证什么</h3><p>{depth.next}</p></article></div></div>
        </div>
        <div className="case-section">
          <span className="eyebrow">WHERE IT LANDED</span>
          <div>
            <h2>把想法做成可体验的东西。</h2>
            <p>{p.outcome}</p>
            <div className="case-links">
              <a href={p.repo} target="_blank" rel="noreferrer">
                探索项目仓库 ↗
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer">
                  打开产品 ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <Link className="next-project wrap" href={`/projects/${next.slug}`}>
        <span className="eyebrow">NEXT PROJECT</span>
        <strong>
          {next.title} <span>↗</span>
        </strong>
      </Link>
      <footer className="case-footer wrap">
        <Link href="/">pear 279 / 李慧珍</Link>
        <a href="mailto:3500788359@qq.com">LET&apos;S TALK ↗</a>
      </footer>
    </main>
  );
}
