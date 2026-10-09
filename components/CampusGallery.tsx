"use client";
import { useRef, useState } from "react";
import { campus } from "@/data/explore";
import { asset } from "@/data/projects";
export function CampusGallery() {
 const dialog = useRef<HTMLDialogElement>(null);
 const [selected,setSelected] = useState(0);
 const photo = campus[selected];
 return <><div className="campus-context"><span>建筑学院学生会执行主席 · 2022.03—2023.03</span><span>学生会 3 年 · 建筑沙龙协会副会长</span></div><div className="campus-gallery">{campus.map((p,i)=><figure key={p.image}><button aria-label={`放大${p.title}照片`} onClick={()=>{setSelected(i);dialog.current?.showModal();}}><img src={asset(`/media/campus-${p.image}.webp`)} alt={p.title} loading="lazy"/><span aria-hidden="true">↗</span></button><figcaption><h2>{p.title}</h2><p>{p.tags.join(" / ")}</p>{p.note&&<small>{p.note}</small>}</figcaption></figure>)}</div>
 <dialog ref={dialog} className="photo-dialog" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}><button className="photo-close" aria-label="关闭照片" onClick={()=>dialog.current?.close()}>×</button><img src={asset(`/media/campus-${photo.image}.webp`)} alt={photo.title}/><p>{photo.title} · {photo.tags.join(" / ")}</p><div><button aria-label="上一张照片" onClick={()=>setSelected((selected+campus.length-1)%campus.length)}>←</button><button aria-label="下一张照片" onClick={()=>setSelected((selected+1)%campus.length)}>→</button></div></dialog>
 </>;
}
