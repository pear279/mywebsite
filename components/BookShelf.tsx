"use client";
import { useState } from "react";
import { reading, readingUpdated } from "@/data/reading";
export function BookShelf() {
 const [open,setOpen] = useState<string|null>(null);
 const selected=reading.find(b=>b.title===open);
 return <><div className="shelf-meta"><span>{reading.length} 本在读</span><span>微信读书 · 更新于 {readingUpdated}</span></div><div className="book-shelf">{reading.map((b,i)=><button className={`book-spine ${open===b.title?"book-is-open":""}`} key={b.title} aria-expanded={open===b.title} aria-controls="book-details" aria-label={`${b.title}，展开书籍`} onClick={()=>setOpen(open===b.title?null:b.title)}><span>{String(i+1).padStart(2,"0")}</span><strong>{b.title}</strong><small>{b.progress}%</small></button>)}</div>
 <div id="book-details" className="book-details" hidden={!selected}>{selected&&<><img src={selected.cover} alt={`${selected.title}封面`} loading="lazy" referrerPolicy="no-referrer"/><div><span className="eyebrow">CURRENTLY READING</span><h2>{selected.title}</h2><p>{selected.author}</p><span>阅读进度 {selected.progress}%</span><progress value={selected.progress} max={100} aria-label={`${selected.title}阅读进度`}/><a href={selected.deepLink} target="_blank" rel="noreferrer">打开阅读 ↗</a></div><button aria-label="收起书籍详情" onClick={()=>setOpen(null)}>×</button></>}</div>
 <p className="collection-footnote">近期阅读、尚未读完的公开书目。点击书脊，查看封面与进度。</p></>;
}
