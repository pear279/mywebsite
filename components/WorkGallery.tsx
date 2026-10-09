"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

const filters = ["全部", "AI 产品", "交互实验"];
export function WorkGallery() {
  const [filter, setFilter] = useState("全部");
  const [position, setPosition] = useState(0);
  const [end, setEnd] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, left: 0, active: false, moved: false });
  const selected = projects.filter(p => filter === "全部" || p.category === filter);
  const update = () => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".gallery-card");
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setPosition(atEnd && el.scrollLeft > 0 ? selected.length - 1 : Math.min(selected.length - 1, Math.round(el.scrollLeft / ((card?.offsetWidth || 1) + 24))));
    setEnd(atEnd);
  };
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  // The gallery is reset whenever its category changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const move = (direction: number, instant = false) => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>(".gallery-card");
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: instant || matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const release = () => {
    drag.current.active = false;
    rail.current?.classList.remove("is-dragging");
  };
  return <section className="work work-gallery" id="work">
    <div className="section-heading wrap" data-reveal>
      <div><span className="eyebrow">SELECTED WORK / 2025—2026</span><h2>作品。</h2><p className="gallery-intro">AI 产品与交互实验。</p></div>
      <div className="filters" aria-label="作品筛选">{filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div>
    </div>
    <div ref={rail} className="gallery-rail" role="region" aria-label="横向作品画廊，可使用左右方向键浏览" tabIndex={0} onScroll={update}
      onKeyDown={e => { if (e.target === e.currentTarget && ["ArrowLeft", "ArrowRight"].includes(e.key)) { e.preventDefault(); move(e.key === "ArrowRight" ? 1 : -1, true); } }}
      onPointerDown={e => { if (e.pointerType === "mouse" && e.button === 0) drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, active: true, moved: false }; }}
      onPointerMove={e => { const d = drag.current; if (!d.active) return; if (Math.abs(e.clientX - d.x) > 6) { d.moved = true; e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.classList.add("is-dragging"); } if (d.moved) e.currentTarget.scrollLeft = d.left - (e.clientX - d.x); }}
      onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}
      onClickCapture={e => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}>
      {selected.map(p => <article className={`gallery-card gallery-${p.color}`} key={p.slug}>
        <Link className="gallery-link" href={`/projects/${p.slug}`} aria-label={`查看 ${p.title} 项目案例`} draggable={false} onDragStart={e => e.preventDefault()}>
          <ProjectVisual project={p} />
          <span className="gallery-number">0{projects.indexOf(p) + 1} / PROJECT</span>
          <span className="gallery-open" aria-hidden="true">查看案例 ↗</span>
          <div className="gallery-copy"><span className="gallery-category">{p.category} · {p.year}</span><h3>{p.title}<span>{p.chinese}</span></h3><p>{p.tagline}</p><div className="gallery-tags"><span>{p.decisions[0].title}</span><span>{p.decisions[1].title}</span></div></div>
        </Link>
      </article>)}
    </div>
    <div className="gallery-footer wrap"><span className="gallery-hint">拖动探索 <span aria-hidden="true">↔</span> 点击进入完整案例</span><div className="gallery-controls"><span className="gallery-count" aria-live="polite">0{position + 1} / 0{selected.length}</span><button aria-label="上一个作品" disabled={position === 0} onClick={() => move(-1)}>←</button><button aria-label="下一个作品" disabled={end} onClick={() => move(1)}>→</button></div></div>
  </section>;
}
