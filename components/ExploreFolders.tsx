import Link from "next/link";
import { folders } from "@/data/explore";
import { asset } from "@/data/projects";
export function ExploreFolders() {
  return <section className="explore wrap" id="explore" data-reveal>
    <div className="explore-heading"><span className="eyebrow">MORE TO EXPLORE</span><h2>工作之外，也有这些我。</h2><p>打开一个文件夹，随意看看。</p></div>
    <div className="folder-grid">{folders.map((f, i) => <Link className={`folder-link folder-${f.color}`} href={`/explore/${f.slug}`} key={f.slug} aria-label={`打开${f.title}文件夹`}>
      <div className="folder-art" aria-hidden="true"><span className="folder-back" />
        {f.papers.map((p, j) => <span className={`folder-paper paper-${j}`} key={p}>{f.slug === "campus" ? <img src={asset(`/media/campus-${["charity","sports","architecture"][j]}.webp`)} alt="" /> : <><small>{f.english}</small><strong>{p}</strong><span>{["◎","◇","✦"][j]}</span></>}</span>)}
        <span className="folder-front"><span>0{i+1}</span><i>↗</i></span></div>
      <div className="folder-label"><h3>{f.title}</h3><span>{f.note}</span></div>
    </Link>)}</div>
  </section>;
}
