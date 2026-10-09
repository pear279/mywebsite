const rows = [
  [["访", "用户访谈", "M5 5h14v10H9l-4 4V5Z"], ["稿", "PRD / 原型", "M7 3h7l4 4v14H7V3Zm7 0v5h4M10 12h5m-5 4h5"], ["链", "Agent / RAG", "M8 8h8v8H8zM12 3v5m0 8v5M3 12h5m8 0h5"], ["测", "模型评测", "m5 12 4 4 10-10M4 20h16"]],
  [["数", "SQL / Python", "M5 7c0-5 14-5 14 0v10c0 5-14 5-14 0V7Zm0 0c0 5 14 5 14 0M5 12c0 5 14 5 14 0"], ["形", "Figma", "M8 3h8v6H8zm0 6h8v6H8zm0 6h4v6H8z"], ["造", "AI 辅助开发", "m8 5-5 7 5 7m8-14 5 7-5 7m-3-16-2 18"], ["协", "项目协作", "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20v-3c0-6 12-6 12 0v3m2-7c4 0 6 1 6 4v3"]],
];
export function Skills() {
 return <div className="skill-marquees" aria-label="专业能力：用户访谈、PRD 与原型、Agent 与 RAG、模型评测、SQL 与 Python、Figma、AI 辅助开发、项目协作">
  {rows.map((row,i)=><div className={`skill-marquee row-${i}`} key={i}><div className="skill-track">{[0,1].map(copy=><div className="skill-group" key={copy} aria-hidden={copy===1}>{row.map(([icon,label,path])=><span className="skill-unit" key={label}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span>{label}</span></span>)}</div>)}</div></div>)}
 </div>;
}
