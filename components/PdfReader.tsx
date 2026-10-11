"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, PDFDocumentLoadingTask, RenderTask } from "pdfjs-dist";
import { asset } from "@/data/projects";

export function PdfReader({ file, title }: { file: string; title: string }) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let task: PDFDocumentLoadingTask | undefined;
    import("pdfjs-dist/legacy/build/pdf.mjs").then(pdfjs => {
      if (disposed) return;
      const resources = asset("/pdfjs/4.10.38/");
      pdfjs.GlobalWorkerOptions.workerSrc = `${resources}pdf.worker.min.mjs`;
      task = pdfjs.getDocument({ url: asset(file), cMapUrl: `${resources}cmaps/`, cMapPacked: true, standardFontDataUrl: `${resources}standard_fonts/`, isEvalSupported: false });
      return task.promise;
    }).then(pdf => { if (pdf && !disposed) setDocument(pdf); }).catch(() => { if (!disposed) { setError(true); setBusy(false); } });
    return () => { disposed = true; void task?.destroy(); };
  }, [file]);

  useEffect(() => {
    if (!frame.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!document || !width || !canvas.current) return;
    let disposed = false;
    let render: RenderTask | undefined;
    const surface = canvas.current;
    setBusy(true);
    setError(false);
    setText("");
    document.getPage(page).then(async pdfPage => {
      if (disposed) return;
      const viewport = pdfPage.getViewport({ scale: width / pdfPage.getViewport({ scale: 1 }).width });
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = Math.floor(viewport.width * scale);
      surface.height = Math.floor(viewport.height * scale);
      surface.style.width = `${viewport.width}px`;
      surface.style.height = `${viewport.height}px`;
      const context = surface.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      render = pdfPage.render({ canvasContext: context, viewport, transform: [scale, 0, 0, scale, 0, 0] });
      await render.promise;
      if (disposed) return;
      setBusy(false);
      const content = await pdfPage.getTextContent();
      if (!disposed) setText(content.items.map(item => "str" in item ? item.str : "").join(" "));
    }).catch(() => { if (!disposed) { setError(true); setBusy(false); } });
    return () => { disposed = true; render?.cancel(); };
  }, [document, page, width]);

  return <div className="pdf-reader">
    <div className="pdf-controls" role="group" aria-label="作品集翻页">
      <button type="button" disabled={!document || page === 1} onClick={() => setPage(value => value - 1)}>← 上一页</button>
      {document ? <label>第 <select aria-label="跳转到页码" value={page} onChange={event => setPage(Number(event.target.value))}>{Array.from({ length: document.numPages }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select> / {document.numPages} 页</label> : <span>正在打开作品集…</span>}
      <button type="button" disabled={!document || page === document.numPages} onClick={() => setPage(value => value + 1)}>下一页 →</button>
    </div>
    <div className="pdf-paper" ref={frame} aria-busy={busy}>
      {busy && !error && <p className="pdf-status" role="status">正在加载页面…</p>}
      {error && <p className="pdf-status" role="alert">暂时无法加载，请尝试<a href={asset(file)} target="_blank" rel="noreferrer">新窗口预览 ↗</a>。</p>}
      <canvas key={`${page}-${width}`} ref={canvas} role="img" aria-label={`${title}，第 ${page} 页`} style={{ visibility: busy || error ? "hidden" : "visible" }} />
      <p className="sr-only">{text}</p>
    </div>
    <p className="pdf-page-caption" aria-live="polite">{document && !busy && !error ? `第 ${page} 页，共 ${document.numPages} 页` : ""}</p>
  </div>;
}
