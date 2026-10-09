"use client";
import { useEffect, useRef } from "react";

export function CursorRipple() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const nodes = Array.from(layer.current?.children || []) as HTMLElement[];
    let index = 0, lastTime = 0, lastX = -1000, lastY = -1000;
    const animations = new Set<Animation>();
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || document.hidden) return;
      const now = performance.now();
      if (now - lastTime < 70 || Math.hypot(event.clientX - lastX, event.clientY - lastY) < 22) return;
      lastTime = now; lastX = event.clientX; lastY = event.clientY;
      const node = nodes[index++ % nodes.length];
      node.getAnimations().forEach(a => { a.cancel(); animations.delete(a); });
      node.style.left = `${event.clientX}px`;
      node.style.top = `${event.clientY}px`;
      const animation = node.animate([
        { transform: "translate(-50%, -50%) scale(.2)", opacity: 0 },
        { transform: "translate(-50%, -50%) scale(.45)", opacity: .36, offset: .16 },
        { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
      ], { duration: 1200, easing: "cubic-bezier(.23, 1, .32, 1)" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const clear = () => { animations.forEach(a => a.cancel()); animations.clear(); };
    window.addEventListener("pointermove", move, { passive: true });
    media.addEventListener("change", clear);
    document.addEventListener("visibilitychange", clear);
    return () => { window.removeEventListener("pointermove", move); media.removeEventListener("change", clear); document.removeEventListener("visibilitychange", clear); clear(); };
  }, []);
  return <div ref={layer} className="cursor-ripples" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i} />)}</div>;
}
