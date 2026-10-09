import Link from "next/link";
import { notFound } from "next/navigation";
import { Brand } from "@/components/Brand";
import { BookShelf } from "@/components/BookShelf";
import { CampusGallery } from "@/components/CampusGallery";
import { folders, skills, games } from "@/data/explore";
import type { Metadata } from "next";
export function generateStaticParams(){return folders.map(f=>({slug:f.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{return {title:`${folders.find(f=>f.slug===params.slug)?.title || "Explore"} · pear 279`};}
export default function ExplorePage({params}:{params:{slug:string}}){
 const f=folders.find(f=>f.slug===params.slug);if(!f)notFound();
 const descriptions:Record<string,string>={skills:"把问题看清楚，把想法做出来。",campus:"一起组织、一起参与的那些瞬间。",reading:"从产品到文学，保持好奇。",playing:"喜欢休闲与益智，也喜欢慢慢探索。"};
 return <main className="collection-page"><header className="case-nav wrap"><Link href="/" aria-label="返回首页"><Brand compact/></Link><Link href="/#explore">← 全部文件夹</Link><Link href="/#contact">联系 ↗</Link></header><section className="collection-body wrap"><div className="collection-heading"><div><span className="eyebrow">PEAR&apos;S FOLDER / {f.english}</span><h1>{f.title}<span>↘</span></h1></div><p>{descriptions[f.slug]}</p></div>
 {f.slug==="skills"&&<><div className="toolkit-grid">{skills.map(s=><article key={s.title}><span className="toolkit-icon" aria-hidden="true">{s.icon}</span><h2>{s.title}</h2><p>{s.text}</p><ul>{s.tools.map(t=><li key={t}>{t}</li>)}</ul></article>)}</div><p className="collection-footnote">能力与工具整理自个人简历。</p></>}
 {f.slug==="campus"&&<CampusGallery/>}
 {f.slug==="reading"&&<BookShelf/>}
 {f.slug==="playing"&&<><div className="games-grid">{games.map(g=><article className={`game-card game-${g.color}`} key={g.title}><div className="game-art" aria-hidden="true"><i/><i/><i/><span>{g.icon}</span></div><div className="game-copy"><span>{g.type}</span><h2>{g.title}</h2><p>{g.note}</p></div></article>)}</div><p className="collection-footnote">探索、经营、塔防、消除和逻辑解谜，是我的休闲偏好。</p></>}
 </section><footer className="collection-footer wrap"><Link href="/#explore">← 返回探索</Link><nav aria-label="探索文件夹">{folders.filter(x=>x.slug!==f.slug).map(x=><Link key={x.slug} href={`/explore/${x.slug}`}>{x.title} ↗</Link>)}</nav></footer></main>;
}
