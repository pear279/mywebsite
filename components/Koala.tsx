"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/projects";
export function Koala() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const react = (next: string) => {
    clearTimeout(timer.current);
    setAction(next);
    timer.current = setTimeout(() => setAction("idle"), 4000);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <aside
      className={`koala-companion ${open ? "is-open" : ""}`}
      aria-label="考拉小伙伴"
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
