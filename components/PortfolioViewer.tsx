"use client";

import { useState } from "react";
import { asset } from "@/data/projects";
import { PdfReader } from "@/components/PdfReader";

type Portfolio = { id: string; title: string; subtitle: string; pages: number; file: string; cover: string };

export function PortfolioViewer({ documents }: { documents: Portfolio[] }) {
  const [selected, setSelected] = useState(documents[0].id);
  const current = documents.find(document => document.id === selected) || documents[0];
  return <div className="portfolio-collection">
    <div className="portfolio-options" role="group" aria-label="选择作品集">
      {documents.map(document => <button type="button" key={document.id} aria-pressed={selected === document.id} aria-controls="portfolio-preview" onClick={() => setSelected(document.id)}>
        <img src={asset(document.cover)} alt="" />
        <span><strong>{document.title}</strong><small>{document.subtitle} · {document.pages} 页</small></span>
        <span className="portfolio-option-arrow" aria-hidden="true">{selected === document.id ? "↓" : "↗"}</span>
      </button>)}
    </div>
    <section className="portfolio-preview" id="portfolio-preview" aria-label="作品集在线预览">
      <div className="portfolio-toolbar">
        <h2 aria-live="polite">{current.title}<span>PDF / {current.pages} 页</span></h2>
        <div><a href={asset(current.file)} target="_blank" rel="noreferrer">新窗口预览 ↗</a><a href={asset(current.file)} download>下载 PDF ↓</a></div>
      </div>
      <PdfReader key={current.id} file={current.file} title={current.title} />
    </section>
  </div>;
}
