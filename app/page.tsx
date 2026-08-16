'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import ClickSpark from '@/components/ClickSpark';

gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);

const navigation = [
  ['首页', '#home'],
  ['关于我', '#about'],
  ['工作经历', '#experience'],
  ['项目作品', '#projects'],
  ['技能特长', '#skills'],
  ['联系我', '#contact'],
] as const;

const timeline = [
  { date: '2025.02 — 2025.12', title: 'moodseed 情绪社交', type: '产品项目', href: '#project-moodseed' },
  { date: '2025.11 — 至今', title: '“东方游” AI 旅游导览', type: '产品项目', href: '#project-dongfang' },
  { date: '2025.12 — 2026.04', title: 'CodeXpert 云端编码智能体', type: '实习经历', href: '#experience-codexpert' },
  { date: '2026.02 — 2026.03', title: 'SoundLens 音象', type: '产品项目', href: '#project-soundlens' },
  { date: '2026.05 — 2026.08', title: '腾讯浏览器 · Agent 组', type: '实习经历', href: '#experience-tencent' },
];

const projects = [
  {
    id: 'project-moodseed', no: '01', date: '2025.02 — 2025.12', title: 'moodseed', stickyTitle: 'moodseed 情绪社交',
    subtitle: '面向 Z 世代的 AI 情绪社交产品',
    description: '从 107 份问卷与 6 位目标用户深访出发，独立推进用户研究、需求分析、AI 能力设计、原型与 Demo 验证，设计“情绪识别—对话引导—内容推荐”的完整服务链路。',
    tags: ['用户研究', 'RAG', 'NLP', 'Qwen', '商业模式'], repo: 'https://github.com/pear279?tab=repositories', repoLabel: '项目仓库整理中',
    tone: 'lime', visualTitle: ['MOOD', 'SEED'], keywords: ['EMOTION AI', 'LOW-DISTURBANCE', 'PERSONALIZED'],
  },
  {
    id: 'project-dongfang', no: '02', date: '2025.11 — NOW', title: '东方游', stickyTitle: '“东方游” AI 旅游导览',
    subtitle: '面向海外游客的个性化文旅 Agent',
    description: '参与前端 Demo 与产品共创，基于垂直知识库和用户画像生成个性化路线与导览讲解；用 Agent Harness 组织 Multi-Agent 协作，并搭建古籍数据 ETL Pipeline。',
    tags: ['Multi-Agent', 'Agent Harness', 'LlamaIndex', 'ETL', '地图交互'], repo: 'https://github.com/pear279/China-Stroll', repoLabel: 'GitHub ↗',
    tone: 'blue', visualTitle: ['CHINA', 'STROLL'], keywords: ['ROUTE PLANNING', 'LOCAL KNOWLEDGE', 'TRAVEL AGENT'],
  },
  {
    id: 'project-soundlens', no: '03', date: '2026.02 — 2026.03', title: 'SoundLens 音象', stickyTitle: 'SoundLens 音象',
    subtitle: '为听障人士设计的实时声音感知产品',
    description: '独立开发声音监测、波形可视化、异常提醒与停顿检测。用状态机降低误报与抖动，并从隐私和工程落地角度完成服务端写入与本地缓存兜底。',
    tags: ['Next.js', 'TypeScript', 'Web Audio API', 'Supabase', '状态机'], repo: 'https://github.com/pear279/SoundLens', repoLabel: 'GitHub ↗',
    tone: 'coral', visualTitle: ['SOUND', 'LENS'], keywords: ['REAL-TIME AUDIO', 'ACCESSIBILITY', 'PRIVACY FIRST'],
  },
];

const skillRows = [
  [
    { title: '用户研究', note: '从访谈与行为里找到真实问题', tone: 'lime', size: 'wide' },
    { title: '需求分析', note: '把模糊诉求压缩成清晰决策', tone: 'paper', size: 'standard' },
    { title: 'PRD / 原型', note: '定义信息、状态与产品边界', tone: 'violet', size: 'wide' },
    { title: '模型评测', note: '题集、标准与迭代闭环', tone: 'dark', size: 'standard' },
    { title: '产品策略', note: '让用户价值与业务目标相遇', tone: 'blue', size: 'wide' },
    { title: '跨团队推进', note: '设计 × 开发 × 法务 × 业务', tone: 'amber', size: 'standard' },
  ],
  [
    { title: 'RAG', note: '检索、召回与知识可信度', tone: 'coral', size: 'standard' },
    { title: 'Multi-Agent', note: '复杂任务的角色与协作设计', tone: 'blue', size: 'wide' },
    { title: 'Agent Harness', note: '让智能体在工作流里可靠行动', tone: 'paper', size: 'wide' },
    { title: 'SQL / Python', note: '从数据中识别问题与机会', tone: 'lime', size: 'standard' },
    { title: '数据埋点', note: '指标、漏斗与 A/B 实验', tone: 'amber', size: 'wide' },
    { title: 'Figma + Vibe Coding', note: '快速把想法变成可验证 Demo', tone: 'violet', size: 'wide' },
  ],
];

function MarkGeometry({ stacked = false, dots = true, wobbleId }: { stacked?: boolean; dots?: boolean; wobbleId: string }) {
  const numberTransform = stacked ? 'translate(-502 165)' : undefined;

  return (
    <>
      <g className="mark-lines mark-word" fill="none" stroke="#ffffff" filter={`url(#${wobbleId})`}>
        <path className="mark-stroke mark-stroke--p" transform="rotate(-3 116 140)" d="M60 217C52 179 55 105 63 70C68 51 80 55 82 77C84 96 72 122 78 148C84 174 119 185 150 169C177 155 182 122 164 101C143 78 102 82 83 105C66 127 76 155 102 160C127 166 154 151 157 130C160 110 142 101 126 107C108 113 99 128 103 141C108 155 125 157 138 148C151 140 154 126 148 119C142 111 132 116 127 125L121 139" />
        <path className="mark-stroke mark-stroke--e" transform="rotate(2 253 143)" d="M202 143C203 104 235 79 270 91C299 101 307 126 291 143C276 159 239 152 218 140C239 137 283 137 300 153C314 166 298 188 277 197C249 209 214 191 203 164C194 140 211 112 238 105C263 99 282 112 280 128C278 144 258 150 243 141C229 133 231 118 242 112C254 106 267 113 266 125C265 135 253 139 247 133" />
        <path className="mark-stroke mark-stroke--a" transform="rotate(-4 375 140)" d="M333 174C314 157 313 125 330 103C349 79 385 82 405 102C426 124 421 160 400 177C381 193 346 188 332 165C321 146 329 120 350 109C370 98 395 106 399 126C403 145 386 161 369 158C351 155 344 137 353 124C362 112 380 113 387 126C394 139 384 151 374 147C362 143 364 132 371 128C383 121 402 136 414 159C424 176 431 187 439 181" />
        <path className="mark-stroke mark-stroke--r" transform="rotate(3 495 136)" d="M466 190C461 151 461 104 468 80C473 64 485 71 485 92C485 111 477 126 482 143C488 112 501 85 519 82C536 79 549 91 545 103C541 115 526 116 515 107C504 99 493 107 489 122C485 138 493 146 507 140C518 136 528 126 540 132" />
      </g>
      <g className="mark-lines mark-number" fill="none" stroke="#ffffff" filter={`url(#${wobbleId})`} transform={numberTransform}>
        <path className="mark-stroke mark-stroke--two" transform="rotate(-3 640 148)" d="M584 123C588 88 619 71 652 82C687 94 699 123 681 149C665 171 630 184 607 201C632 197 674 191 694 200C707 206 700 220 687 222C657 227 612 226 590 219C576 214 578 201 590 190C610 171 654 157 670 137C681 123 670 104 652 101C632 98 612 109 607 127C602 143 578 142 584 123C586 116 590 112 597 108" />
        <path className="mark-stroke mark-stroke--seven" transform="rotate(4 794 145)" d="M724 91C759 98 813 92 846 80C857 76 863 87 854 100C831 133 817 169 787 212C779 223 763 215 769 201C790 166 817 133 834 103C803 113 765 116 737 107C719 101 713 88 724 91C744 98 780 123 814 143C827 151 838 145 841 133" />
        <path className="mark-stroke mark-stroke--nine" transform="rotate(-2 912 148)" d="M900 173C873 166 857 139 865 110C874 78 908 68 936 83C963 98 968 132 954 163C942 190 923 214 899 224C878 232 859 218 864 201C868 188 884 188 892 198C900 209 914 204 923 190C937 168 943 137 934 114C927 96 904 93 892 106C879 119 884 141 900 148C917 156 934 143 934 127C934 111 921 104 909 110C897 116 896 130 906 136C916 143 930 137 938 126C946 115 952 106 959 110" />
      </g>
      {dots && (
        <g className="mark-notes" aria-hidden="true" focusable="false">
          <g className="mark-word-notes">
            <g className="mark-note"><circle cx="91" cy="93" r="3.2" /><text x="99" y="86">1</text></g>
            <g className="mark-note"><circle cx="139" cy="128" r="2.4" /><text x="146" y="120">2</text></g>
            <g className="mark-note"><circle cx="184" cy="171" r="3" /><text x="192" y="164">3</text></g>
            <g className="mark-note"><circle cx="248" cy="101" r="2.6" /><text x="256" y="94">4</text></g>
            <g className="mark-note"><circle cx="278" cy="176" r="3.1" /><text x="286" y="168">5</text></g>
            <g className="mark-note"><circle cx="346" cy="151" r="2.3" /><text x="354" y="144">6</text></g>
            <g className="mark-note"><circle cx="397" cy="103" r="3.2" /><text x="406" y="96">7</text></g>
            <g className="mark-note"><circle cx="481" cy="133" r="2.8" /><text x="489" y="126">8</text></g>
            <circle className="mark-note-dot" cx="111" cy="181" r="1.7" />
            <circle className="mark-note-dot" cx="301" cy="123" r="1.4" />
            <circle className="mark-note-dot" cx="430" cy="161" r="1.8" />
            <circle className="mark-note-dot" cx="526" cy="91" r="1.5" />
          </g>
          <g className="mark-number-notes" transform={numberTransform}>
            <g className="mark-note"><circle cx="608" cy="103" r="2.7" /><text x="616" y="96">9</text></g>
            <g className="mark-note"><circle cx="666" cy="174" r="3.2" /><text x="675" y="167">10</text></g>
            <g className="mark-note"><circle cx="792" cy="113" r="2.5" /><text x="800" y="106">11</text></g>
            <g className="mark-note"><circle cx="915" cy="139" r="3.3" /><text x="924" y="132">12</text></g>
            <circle className="mark-note-dot" cx="584" cy="157" r="1.6" />
            <circle className="mark-note-dot" cx="704" cy="207" r="1.9" />
            <circle className="mark-note-dot" cx="748" cy="87" r="1.5" />
            <circle className="mark-note-dot" cx="835" cy="161" r="1.8" />
            <circle className="mark-note-dot" cx="952" cy="188" r="1.5" />
          </g>
        </g>
      )}
    </>
  );
}

function Mark({ compact = false }: { compact?: boolean }) {
  const markId = useId().replace(/:/g, '');
  const wideWobbleId = `marker-wobble-wide-${markId}`;
  const stackedWobbleId = `marker-wobble-stacked-${markId}`;

  return (
    <span className={compact ? 'mark mark--compact' : 'mark'} aria-label="pear 279">
      <svg className="mark-svg mark-svg--wide" viewBox="0 0 1000 260" role="img" aria-hidden="true">
        <defs>
          <filter id={wideWobbleId} x="-5%" y="-12%" width="110%" height="124%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.055" numOctaves="2" seed="27" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
        <MarkGeometry dots={!compact} wobbleId={wideWobbleId} />
      </svg>
      {!compact && (
        <svg className="mark-svg mark-svg--stacked" viewBox="0 0 540 450" role="img" aria-hidden="true">
          <defs>
            <filter id={stackedWobbleId} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves="2" seed="31" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.7" xChannelSelector="R" yChannelSelector="B" />
            </filter>
          </defs>
          <MarkGeometry stacked wobbleId={stackedWobbleId} />
        </svg>
      )}
    </span>
  );
}

function HeroArtwork() {
  return <span className="hero-artwork" role="img" aria-label="Pear 279 手写线稿" />;
}

function ChapterHead({ no, label, title, note }: { no: string; label: string; title: string; note: string }) {
  return (
    <div className="chapter-head" data-reveal>
      <div className="section-kicker"><span>( {no} )</span><span>{label}</span></div>
      <div className="chapter-title"><h2>{title}</h2><p>{note}</p></div>
    </div>
  );
}

function StickyLabel({ eyebrow, title, date, total }: { eyebrow: string; title: string; date: string; total: number }) {
  return (
    <div className="work-sticky-label" data-sticky-caption aria-hidden="true">
      <small>{eyebrow}</small><span data-stick-name>{title}</span><time data-stick-date>{date}</time><b data-stick-progress>01 / 0{total}</b>
    </div>
  );
}

function SkillCard({ card, duplicate = false }: { card: (typeof skillRows)[number][number]; duplicate?: boolean }) {
  return (
    <article
      className={`skill-card skill-card--${card.tone} skill-card--${card.size}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : 0}
    >
      <small>CAPABILITY</small><h3>{card.title}</h3><p>{card.note}</p><span>↗</span>
    </article>
  );
}

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      anchors: false,
    });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopNavigation = window.matchMedia('(min-width: 1041px) and (pointer: fine)');
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-snap-section]'));
    const sectionIndexById = new Map(sections.map((section, index) => [section.id, index]));
    type WorkKey = 'experience' | 'projects';
    type WorkGroup = { panels: HTMLElement[]; caption: HTMLElement | null; index: number };
    const workGroups: Record<WorkKey, WorkGroup> = {
      experience: {
        panels: Array.from(root.querySelectorAll<HTMLElement>('#experience [data-work-panel]')),
        caption: root.querySelector<HTMLElement>('#experience [data-sticky-caption]'),
        index: 0,
      },
      projects: {
        panels: Array.from(root.querySelectorAll<HTMLElement>('#projects [data-work-panel]')),
        caption: root.querySelector<HTMLElement>('#projects [data-sticky-caption]'),
        index: 0,
      },
    };
    let currentSectionIndex = sections.reduce((closest, section, index) => (
      Math.abs(section.offsetTop - window.scrollY) < Math.abs(sections[closest].offsetTop - window.scrollY) ? index : closest
    ), 0);
    let inputLocked = false;
    let observer: Observer | undefined;

    const updateLocation = (hash: string) => {
      if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
    };

    const updateCaption = (group: WorkGroup, panel: HTMLElement, index: number) => {
      const name = group.caption?.querySelector<HTMLElement>('[data-stick-name]');
      const date = group.caption?.querySelector<HTMLElement>('[data-stick-date]');
      const progress = group.caption?.querySelector<HTMLElement>('[data-stick-progress]');
      if (name) name.textContent = panel.dataset.stickyName ?? '';
      if (date) date.textContent = panel.dataset.stickyDate ?? '';
      if (progress) progress.textContent = `${String(index + 1).padStart(2, '0')} / ${String(group.panels.length).padStart(2, '0')}`;
    };

    const showWorkPanel = (key: WorkKey, nextIndex: number, direction: number, animate = true, syncHash = true) => {
      const group = workGroups[key];
      const boundedIndex = Math.max(0, Math.min(group.panels.length - 1, nextIndex));
      const currentPanel = group.panels[group.index];
      const nextPanel = group.panels[boundedIndex];
      if (!nextPanel) return;
      group.panels.forEach((panel, index) => {
        const active = index === boundedIndex;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
        panel.inert = !active;
      });
      updateCaption(group, nextPanel, boundedIndex);
      group.index = boundedIndex;
      if (syncHash) updateLocation(`#${nextPanel.id}`);
      if (!animate || currentPanel === nextPanel || reducedMotion.matches) {
        gsap.set(group.panels, { autoAlpha: 0, yPercent: 0, scale: 1 });
        gsap.set(nextPanel, { autoAlpha: 1 });
        inputLocked = false;
        return;
      }
      inputLocked = true;
      gsap.killTweensOf(group.panels);
      const timeline = gsap.timeline({
        defaults: { overwrite: true },
        onComplete: () => { inputLocked = false; },
      })
        .to(currentPanel, { autoAlpha: 0, yPercent: direction > 0 ? -7 : 7, scale: 0.985, duration: 0.28, ease: 'power2.in' })
        .fromTo(nextPanel,
          { autoAlpha: 0, yPercent: direction > 0 ? 7 : -7, scale: 0.985 },
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.48, ease: 'power4.out' },
          '-=0.08');
      if (group.caption) {
        timeline.fromTo(group.caption, { scale: 0.96 }, { scale: 1.035, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, '-=0.34');
      }
    };

    const moveToSection = (nextIndex: number, direction: number, targetHash?: string) => {
      const boundedIndex = Math.max(0, Math.min(sections.length - 1, nextIndex));
      const section = sections[boundedIndex];
      if (!section || boundedIndex === currentSectionIndex) return;
      inputLocked = true;
      currentSectionIndex = boundedIndex;
      const workKey = section.id === 'experience' || section.id === 'projects' ? section.id as WorkKey : null;
      if (workKey) {
        const requestedPanelIndex = targetHash
          ? workGroups[workKey].panels.findIndex((panel) => `#${panel.id}` === targetHash)
          : -1;
        const entryIndex = requestedPanelIndex >= 0
          ? requestedPanelIndex
          : direction > 0 ? 0 : workGroups[workKey].panels.length - 1;
        showWorkPanel(workKey, entryIndex, direction, false, false);
        inputLocked = true;
      }
      lenis.scrollTo(section.offsetTop, {
        duration: reducedMotion.matches ? 0.01 : 0.92,
        lock: true,
        force: true,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        onComplete: () => {
          inputLocked = false;
          updateLocation(targetHash ?? `#${section.id}`);
        },
      });
    };

    const advance = (direction: number) => {
      if (inputLocked || !desktopNavigation.matches) return;
      const currentSection = sections[currentSectionIndex];
      if (!currentSection) return;
      if (currentSection.id === 'experience') {
        const group = workGroups.experience;
        const next = group.index + direction;
        if (next >= 0 && next < group.panels.length) {
          showWorkPanel('experience', next, direction);
          return;
        }
      }
      if (currentSection.id === 'projects') {
        const group = workGroups.projects;
        const next = group.index + direction;
        if (next >= 0 && next < group.panels.length) {
          showWorkPanel('projects', next, direction);
          return;
        }
      }
      moveToSection(currentSectionIndex + direction, direction);
    };

    const resolveAnchor = (hash: string) => {
      const target = root.querySelector<HTMLElement>(hash);
      if (!target) return;
      const workPanel = target.closest<HTMLElement>('[data-work-panel]');
      const section = target.closest<HTMLElement>('[data-snap-section]') ?? target;
      const sectionIndex = sectionIndexById.get(section.id);
      if (sectionIndex === undefined) return;
      if (workPanel) {
        const key = section.id as WorkKey;
        const panelIndex = workGroups[key].panels.indexOf(workPanel);
        if (panelIndex >= 0) showWorkPanel(key, panelIndex, panelIndex >= workGroups[key].index ? 1 : -1, false, false);
      }
      if (sectionIndex === currentSectionIndex) {
        updateLocation(hash);
      } else {
        moveToSection(sectionIndex, sectionIndex > currentSectionIndex ? 1 : -1, hash);
      }
    };

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || !anchor.hash || !root.contains(anchor)) return;
      event.preventDefault();
      setMenuOpen(false);
      resolveAnchor(anchor.hash);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!desktopNavigation.matches || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        advance(1);
      } else if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        advance(-1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        moveToSection(0, -1);
      } else if (event.key === 'End') {
        event.preventDefault();
        moveToSection(sections.length - 1, 1);
      }
    };

    const setupObserver = () => {
      observer?.kill();
      observer = undefined;
      if (!desktopNavigation.matches) {
        lenis.start();
        Object.values(workGroups).forEach((group) => {
          group.panels.forEach((panel) => {
            panel.inert = false;
            panel.removeAttribute('aria-hidden');
          });
        });
        return;
      }
      lenis.start();
      Object.entries(workGroups).forEach(([key, group]) => showWorkPanel(key as WorkKey, group.index, 1, false, false));
      observer = Observer.create({
        id: 'chapter-wheel-navigation',
        target: window,
        type: 'wheel',
        preventDefault: true,
        tolerance: 28,
        wheelSpeed: 1,
        ignoreCheck: (event) => (event as WheelEvent).ctrlKey || (event as WheelEvent).metaKey,
        onChangeY: (self) => {
          const currentSection = sections[currentSectionIndex];
          if (currentSection) lenis.scrollTo(currentSection.offsetTop, { immediate: true, force: true });
          advance(self.deltaY > 0 ? 1 : -1);
        },
      });
    };

    Object.entries(workGroups).forEach(([key, group]) => showWorkPanel(key as WorkKey, group.index, 1, false, false));
    const onScroll = () => {
      setScrolled(lenis.scroll > window.innerHeight * 0.56);
      ScrollTrigger.update();
      if (!inputLocked) {
        currentSectionIndex = sections.reduce((closest, section, index) => (
          Math.abs(section.offsetTop - lenis.scroll) < Math.abs(sections[closest].offsetTop - lenis.scroll) ? index : closest
        ), currentSectionIndex);
      }
    };
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    root.addEventListener('click', onAnchorClick);
    window.addEventListener('keydown', onKeyDown);
    desktopNavigation.addEventListener('change', setupObserver);
    setupObserver();
    if (window.location.hash && window.location.hash !== '#home') {
      requestAnimationFrame(() => resolveAnchor(window.location.hash));
    }
    ScrollTrigger.refresh();
    return () => {
      observer?.kill();
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      root.removeEventListener('click', onAnchorClick);
      window.removeEventListener('keydown', onKeyDown);
      desktopNavigation.removeEventListener('change', setupObserver);
      gsap.killTweensOf([...workGroups.experience.panels, ...workGroups.projects.panels]);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const sectionTriggers: ScrollTrigger[] = [];
    gsap.utils.toArray<HTMLElement>('.hero, [data-nav-section]').forEach((section) => {
      sectionTriggers.push(ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: ({ isActive }) => isActive && setActiveSection(`#${section.id}`),
      }));
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
        .addLabel('signature')
        .from('.hero-artwork', { autoAlpha: 0, y: 12, scale: 0.975, duration: 1.05 }, 'signature')
        .from('.hero-role > *', { autoAlpha: 0, y: 14, duration: 0.52, stagger: 0.075 }, '-=.24')
        .from('.scroll-cue', { autoAlpha: 0, y: 10, duration: 0.5 }, '-=.26');

      const exit = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 42%', scrub: 0.68 },
      })
        .to('.hero-role', { autoAlpha: 0, y: -18, duration: 0.34 }, 0)
        .to('.scroll-cue', { autoAlpha: 0, y: 10, duration: 0.3 }, 0)
        .to('.hero-mark-inner', { yPercent: -4, scale: 0.96, duration: 1 }, 0)
        .to('.hero-mark', { autoAlpha: 0, duration: 0.66 }, 0.16)
        .to('.hero-haze--near', { autoAlpha: 0, scale: 1.08, duration: 1 }, 0)
        .to('.hero-depth', { autoAlpha: 0.34, duration: 1 }, 0);

      gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-work-panel])').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 38,
          duration: 0.78,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      const hero = rootRef.current?.querySelector<HTMLElement>('.hero');
      const heroMark = hero?.querySelector<HTMLElement>('.hero-mark-inner');
      const heroHaze = hero?.querySelector<HTMLElement>('.hero-haze--near');
      const finePointer = window.matchMedia('(pointer: fine)');
      if (!hero || !heroMark || !heroHaze || !finePointer.matches) {
        return () => {
          intro.kill();
          exit.kill();
        };
      }
      const moveX = gsap.quickTo(heroMark, 'x', { duration: 0.72, ease: 'power3.out' });
      const moveY = gsap.quickTo(heroMark, 'y', { duration: 0.72, ease: 'power3.out' });
      const hazeX = gsap.quickTo(heroHaze, 'x', { duration: 1.05, ease: 'power3.out' });
      const hazeY = gsap.quickTo(heroHaze, 'y', { duration: 1.05, ease: 'power3.out' });
      const onPointerMove = (event: PointerEvent) => {
        const bounds = hero.getBoundingClientRect();
        const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
        moveX(normalizedX * 10);
        moveY(normalizedY * 7);
        hazeX(normalizedX * -18);
        hazeY(normalizedY * -11);
      };
      const onPointerLeave = () => {
        moveX(0);
        moveY(0);
        hazeX(0);
        hazeY(0);
      };
      hero.addEventListener('pointermove', onPointerMove);
      hero.addEventListener('pointerleave', onPointerLeave);
      return () => {
        hero.removeEventListener('pointermove', onPointerMove);
        hero.removeEventListener('pointerleave', onPointerLeave);
        intro.kill();
        exit.kill();
      };
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-reveal]:not([data-work-panel])', { autoAlpha: 1, y: 0 });
      gsap.set('.hero-artwork, .hero-role, .scroll-cue', { autoAlpha: 1, x: 0, y: 0 });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      mm.revert();
      sectionTriggers.forEach((trigger) => trigger.kill());
    };
  }, { scope: rootRef });

  return (
    <div className="site-shell" ref={rootRef}>
      <a className={`corner-mark ${scrolled ? 'is-visible' : ''}`} href="#home" aria-label="返回首页"><Mark compact /></a>

      <header className="site-header">
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="site-navigation">
          {menuOpen ? '关闭' : '菜单'}
        </button>
        <nav id="site-navigation" className={menuOpen ? 'nav is-open' : 'nav'} aria-label="主导航">
          {navigation.map(([label, href]) => (
            <a className={activeSection === href ? 'is-active' : ''} key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-download" href="/李慧珍-AI产品经理-简历.pdf" download>下载简历 <span>↓</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" data-snap-section>
          <ClickSpark sparkColor="#fff" sparkSize={12} sparkRadius={20} sparkCount={9} duration={500}>
            <span className="hero-depth" aria-hidden="true" />
            <span className="hero-haze hero-haze--far" aria-hidden="true" />
            <span className="hero-haze hero-haze--near" aria-hidden="true" />
            <div className="hero-mark">
              <div className="hero-mark-inner"><HeroArtwork />
                <div className="hero-role">
                  <span>AI PRODUCT · HUMAN FIRST <i aria-hidden="true">●</i></span>
                  <div><strong>AI 产品经理</strong><em>把复杂 AI 变成自然体验</em></div>
                </div>
              </div>
            </div>
            <a className="scroll-cue" href="#about">
              <span className="scroll-cue-window">
                <span className="scroll-cue-track"><span>SCROLL FOR MORE</span><span aria-hidden="true">SCROLL FOR MORE</span></span>
              </span>
              <i>↓</i>
            </a>
          </ClickSpark>
        </section>

        <section className="about section" id="about" data-motion-section data-nav-section data-snap-section>
          <div className="section-kicker" data-reveal><span>( 01 )</span><span>ABOUT / INDEX</span></div>
          <div className="about-layout">
            <div className="about-primary" data-reveal>
              <small>AI PRODUCT MANAGER · NANJING</small>
              <h1>让复杂的 AI，成为自然好用的产品。</h1>
            </div>
            <div className="about-copy" data-reveal>
              <p>你好，我是李慧珍，一名建筑学背景的 AI 产品经理。我的工作从用户洞察开始，穿过数据、模型与协作流程，最终落在真实可用的产品体验上。</p>
              <p>熟悉 RAG、Embedding、Transformer、Multi-Agent 与 Agent Harness，也能用 SQL / Python 看清数据，用 Figma、Cursor 与前沿 LLM 快速把想法做成 Demo。</p>
            </div>
            <nav className="about-index" aria-label="产品旅程目录" data-reveal>
              {timeline.map((item, index) => (
                <a href={item.href} key={item.title}>
                  <span>0{index + 1}</span><strong>{item.title}</strong><small>{item.type} · {item.date}</small>
                </a>
              ))}
            </nav>
          </div>
          <div className="education" data-reveal>
            <span>EDUCATION</span>
            <div><strong>南京大学 · C9 / 985</strong><small>建筑学硕士 · 2024—2027</small></div>
            <div><strong>三江学院</strong><small>建筑学学士 · 2019—2024</small></div>
          </div>
        </section>

        <section className="experience section work-chapter" id="experience" data-motion-section data-nav-section data-snap-section>
          <ChapterHead no="02" label="EXPERIENCE" title="工作经历" note="两段实习，把 AI 能力放进真实产品与协作流程。" />
          <div className="work-stream" data-work-stream>
            <StickyLabel eyebrow="EXPERIENCE" title="腾讯 · 浏览器 Agent 组" date="2026.05 — 2026.08" total={2} />
            <article className="experience-row is-active" id="experience-tencent" data-work-panel data-sticky-name="腾讯 · 浏览器 Agent 组" data-sticky-date="2026.05 — 2026.08">
              <div className="experience-main">
                <div className="experience-head"><span className="experience-no">01</span><div><h3>腾讯</h3><p>浏览器产品部 Agent 组 · 产品策划</p></div><time>2026.05 — 2026.08</time></div>
                <ul><li>参与 9 个 P0 / P1 需求，独立跟进并创建 4 个需求单，协同设计、开发与法务推进落地。</li><li>负责翻译、通信助手与 Agent 模型评测，设计题集和标准，推动模型效果迭代。</li><li>分析短剧消费 DAU 与留存漏斗，通过 A/B 实验验证内容分发策略并优化用户观看时长。</li></ul>
                <div className="tag-row"><span>需求策划</span><span>模型评测</span><span>A/B 实验</span><span>内容分发</span></div>
              </div>
              <div className="experience-visual visual-violet"><span>AGENT<br />BROWSER</span><small>模型评测 · 内容策略 · 用户洞察</small></div>
            </article>
            <article className="experience-row" id="experience-codexpert" data-work-panel data-sticky-name="CodeXpert 云端编码智能体" data-sticky-date="2025.12 — 2026.04">
              <div className="experience-main">
                <div className="experience-head"><span className="experience-no">02</span><div><h3>元数信息技术</h3><p>CodeXpert 云端编码智能体 · AI 产品经理</p></div><time>2025.12 — 2026.04</time></div>
                <ul><li>参与 AI Coding Agent 从 MVP 到上线的完整推进，完成场景拆解、能力设计与测试验证。</li><li>推动“需求—代码—测试—PR”任务链路打通，提升 AI 在真实研发工作流中的可用性。</li><li>参与数据埋点方案与品牌物料设计，为功能分析、路径观察和产品转化建立基础。</li></ul>
                <div className="tag-row"><span>Coding Agent</span><span>研发工作流</span><span>数据埋点</span><span>品牌设计</span></div>
              </div>
              <div className="experience-visual visual-amber"><span>CODE<br />XPERT</span><small>MVP · WORKFLOW · SHIPPING</small></div>
            </article>
          </div>
        </section>

        <section className="projects section work-chapter" id="projects" data-motion-section data-nav-section data-snap-section>
          <ChapterHead no="03" label="SELECTED PROJECTS" title="项目作品" note="三个产品，回应情绪、旅行与无障碍感知中的真实问题。" />
          <div className="work-stream project-list" data-work-stream>
            <StickyLabel eyebrow="PROJECT" title={projects[0].stickyTitle} date={projects[0].date} total={3} />
            {projects.map((project, projectIndex) => (
              <article className={`project ${projectIndex === 0 ? 'is-active' : ''}`} id={project.id} key={project.id} data-work-panel data-sticky-name={project.stickyTitle} data-sticky-date={project.date}>
                <div className="project-info">
                  <div className="project-meta"><span>{project.no}</span><time>{project.date}</time></div>
                  <h3>{project.title}</h3><h4>{project.subtitle}</h4><p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href={project.repo} target="_blank" rel="noreferrer" className="text-link">{project.repoLabel}</a>
                </div>
                <a href={project.repo} target="_blank" rel="noreferrer" className={`project-visual project-visual--${project.tone}`} aria-label={`查看 ${project.title} 的 GitHub`}>
                  <span className="project-ghost">{project.visualTitle.map((line) => <span key={line}>{line}</span>)}</span>
                  <span className="project-open">OPEN ↗</span>
                  <span className="project-keywords">{project.keywords.map((keyword) => <small key={keyword}>{keyword}</small>)}</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills" data-motion-section data-nav-section data-snap-section>
          <ChapterHead no="04" label="CAPABILITIES" title="技能特长" note="产品判断、AI 理解、数据意识与交付能力，组成同一条工作链路。" />
          <div className="skill-rails" data-reveal>
            {skillRows.map((row, rowIndex) => (
              <div className={`skill-rail ${rowIndex ? 'skill-rail--reverse' : ''}`} key={rowIndex}>
                <div className="skill-track">
                  <div className="skill-set">{row.map((card) => <SkillCard card={card} key={card.title} />)}</div>
                  <div className="skill-set" aria-hidden="true">{row.map((card) => <SkillCard card={card} duplicate key={`duplicate-${card.title}`} />)}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="skills-note">稳定、善沟通、有推进节奏；建筑训练带来的结构意识和审美判断，让我习惯同时看见产品的逻辑与体验。</p>
        </section>

        <section className="contact section" id="contact" data-motion-section data-nav-section data-snap-section>
          <ChapterHead no="05" label="CONTACT" title="联系我" note="如果你也在把 AI 变成真正有用的产品，我们可以聊聊。" />
          <div className="contact-layout" data-reveal>
            <p>OPEN TO<br />GOOD IDEAS <span>↘</span></p>
            <div className="contact-links">
              <a href="mailto:3500788359@qq.com"><small>EMAIL</small><span>3500788359@qq.com</span><b>↗</b></a>
              <a href="tel:+8615952105455"><small>PHONE</small><span>159 5210 5455</span><b>↗</b></a>
              <a href="https://github.com/pear279" target="_blank" rel="noreferrer"><small>GITHUB</small><span>@pear279</span><b>↗</b></a>
            </div>
          </div>
        </section>
      </main>

      <footer><Mark compact /><p>李慧珍 · AI PRODUCT MANAGER</p><p>© 2026 NANJING, CHINA</p><a href="#home">BACK TO TOP ↑</a></footer>
    </div>
  );
}
