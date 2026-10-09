"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/projects";
export function Koala() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("idle");
  const chapterAction = useRef("greet");
  const manual = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const react = (next: string) => {
    clearTimeout(timer.current);
    manual.current = true;
    setAction(next);
    timer.current = setTimeout(() => { manual.current = false; setAction(chapterAction.current); }, 4000);
  };
  useEffect(() => {
    const actions: Record<string, string> = { home: "greet", intro: "wait", work: "think", experience: "work", practice: "celebrate", about: "ball", contact: "eat" };
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
      const section = sections.find(el => { const r = el.getBoundingClientRect(); return r.top <= innerHeight * .5 && r.bottom > innerHeight * .5; });
      if (section) { chapterAction.current = actions[section.id] || "idle"; if (!manual.current) setAction(chapterAction.current); }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { clearTimeout(timer.current); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, []);
  return (
    <aside
      className={`koala-companion ${open ? "is-open" : ""}`}
      aria-label="考拉小伙伴" data-action={action}
    >
      {open && (
        <div className="koala-panel">
          <p>
            你好，我是 pear 的小考拉。
            <br />
            一起慢慢做点有意思的事。
          </p>
          <div>
            <button onClick={() => react("eat")}>喂片叶子</button>
            <button onClick={() => react("celebrate")}>击个掌</button>
            <button onClick={() => react("sleep")}>休息一下</button>
          </div>
          <span aria-live="polite">
            {action === "eat"
              ? "谢谢你的叶子 ♡"
              : action === "sleep"
                ? "充个电，再出发。"
                : action === "celebrate"
                  ? "做得很好，击掌！"
                  : "点一个动作，认识我。"}
          </span>
        </div>
      )}
      <button
        className="koala-toggle"
        aria-label={open ? "收起考拉小伙伴" : "打开考拉小伙伴"}
        aria-expanded={open}
        onClick={() => {
          setOpen(!open);
          react("greet");
        }}
      >
        <img src={asset(`/media/koala-${action}.webp`)} alt="" />
        <span>{open ? "×" : "say hi"}</span>
      </button>
    </aside>
  );
}
