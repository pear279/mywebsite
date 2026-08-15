'use client';

import { useEffect, useState } from 'react';

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
    id: 'project-moodseed',
    no: '01',
    date: '2025.02 — 2025.12',
    title: 'moodseed',
    subtitle: '面向 Z 世代的 AI 情绪社交产品',
    description:
      '从 107 份问卷与 6 位目标用户深访出发，独立推进用户研究、需求分析、AI 能力设计、原型与 Demo 验证，设计“情绪识别—对话引导—内容推荐”的完整服务链路。',
    tags: ['用户研究', 'RAG', 'NLP', 'Qwen', '商业模式'],
    repo: 'https://github.com/pear279?tab=repositories',
    repoLabel: '项目仓库整理中',
    tone: 'lime',
    visualTitle: 'MOOD\nSEED',
    keywords: ['EMOTION AI', 'LOW-DISTURBANCE', 'PERSONALIZED'],
  },
  {
    id: 'project-dongfang',
    no: '02',
    date: '2025.11 — NOW',
    title: '东方游',
    subtitle: '面向海外游客的个性化文旅 Agent',
    description:
      '参与前端 Demo 与产品共创，基于垂直知识库和用户画像生成个性化路线与导览讲解；用 Agent Harness 组织 Multi-Agent 协作，并搭建古籍数据 ETL Pipeline。',
    tags: ['Multi-Agent', 'Agent Harness', 'LlamaIndex', 'ETL', '地图交互'],
    repo: 'https://github.com/pear279/China-Stroll',
    repoLabel: 'GitHub ↗',
    tone: 'blue',
    visualTitle: 'CHINA\nSTROLL',
    keywords: ['ROUTE PLANNING', 'LOCAL KNOWLEDGE', 'TRAVEL AGENT'],
  },
  {
    id: 'project-soundlens',
    no: '03',
    date: '2026.02 — 2026.03',
    title: 'SoundLens 音象',
    subtitle: '为听障人士设计的实时声音感知产品',
    description:
      '独立开发声音监测、波形可视化、异常提醒与停顿检测。用状态机降低误报与抖动，并从隐私和工程落地角度完成服务端写入与本地缓存兜底。',
    tags: ['Next.js', 'TypeScript', 'Web Audio API', 'Supabase', '状态机'],
    repo: 'https://github.com/pear279/SoundLens',
    repoLabel: 'GitHub ↗',
    tone: 'coral',
    visualTitle: 'SOUND\nLENS',
    keywords: ['REAL-TIME AUDIO', 'ACCESSIBILITY', 'PRIVACY FIRST'],
  },
];

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'mark mark--compact' : 'mark'} aria-label="pear279">
      <svg viewBox="0 0 720 230" role="img" aria-hidden="true">
        <text x="50%" y="66%" textAnchor="middle">pear279</text>
        {!compact && (
          <g className="mark-dots">
            <circle cx="132" cy="74" r="3" />
            <circle cx="144" cy="64" r="2" />
            <circle cx="544" cy="165" r="3" />
            <circle cx="557" cy="151" r="2" />
          </g>
        )}
      </svg>
    </span>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.56);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a className={`corner-mark ${scrolled ? 'is-visible' : ''}`} href="#home" aria-label="返回首页">
        <Mark compact />
      </a>

      <header className="site-header">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
        >
          {menuOpen ? '关闭' : '菜单'}
        </button>
        <nav id="site-navigation" className={menuOpen ? 'nav is-open' : 'nav'} aria-label="主导航">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-download" href="/李慧珍-AI产品经理-简历.pdf" download>
            下载简历 <span>↓</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-meta hero-meta--left">
            <span>AI PRODUCT MANAGER</span>
            <span>NANJING · CHINA</span>
          </div>
          <div className="hero-meta hero-meta--right">
            <span>PRODUCT × AI × DESIGN</span>
            <span>PORTFOLIO ©2026</span>
          </div>
          <div className={`hero-mark ${scrolled ? 'has-scrolled' : ''}`}>
            <Mark />
            <div className="hero-role">
              <span>building?</span>
              <strong>AI 产品经理</strong>
              <em>把技术变成可被感知的产品</em>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span>向下探索</span>
            <i>↓</i>
          </a>
        </section>

        <section className="about section" id="about">
          <div className="section-kicker reveal"><span>( 01 )</span><span>ABOUT</span></div>
          <div className="about-grid">
            <h1 className="about-title reveal">
              我把复杂的 AI 技术，<br />
              <span>变成自然、清晰、可用的产品。</span>
            </h1>
            <div className="about-copy reveal">
              <p>你好，我是李慧珍，一名建筑学背景的 AI 产品经理。我的工作从用户洞察开始，穿过数据、模型与协作流程，最终落在真实可用的产品体验上。</p>
              <p>熟悉 RAG、Embedding、Transformer、Multi-Agent 与 Agent Harness，也能用 SQL / Python 看清数据，用 Figma、Cursor 与前沿 LLM 快速把想法做成 Demo。</p>
            </div>
          </div>

          <div className="education reveal">
            <span>EDUCATION</span>
            <div><strong>南京大学 · C9 / 985</strong><small>建筑学硕士 · 2024—2027</small></div>
            <div><strong>三江学院</strong><small>建筑学学士 · 2019—2024</small></div>
          </div>
        </section>

        <section className="timeline-section section" aria-labelledby="timeline-title">
          <div className="section-kicker reveal"><span>( INDEX )</span><span>PRODUCT JOURNEY</span></div>
          <h2 id="timeline-title" className="timeline-heading reveal">产品旅程</h2>
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <a className="timeline-item reveal" href={item.href} key={item.title}>
                <span className="timeline-index">0{index + 1}</span>
                <span className="timeline-title">{item.title}</span>
                <span className="timeline-type">{item.type}</span>
                <span className="timeline-date">{item.date}</span>
                <span className="timeline-arrow">↘</span>
              </a>
            ))}
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="section-kicker reveal"><span>( 02 )</span><span>EXPERIENCE</span></div>
          <h2 className="section-title reveal">从产品定义，<br />到真实落地。</h2>

          <article className="experience-row reveal" id="experience-tencent">
            <div className="experience-main">
              <div className="experience-head">
                <span className="experience-no">01</span>
                <div><h3>腾讯</h3><p>浏览器产品部 Agent 组 · 产品策划</p></div>
                <time>2026.05 — 2026.08</time>
              </div>
              <ul>
                <li>参与 9 个 P0 / P1 需求，独立跟进并创建 4 个需求单，协同设计、开发与法务推进落地。</li>
                <li>负责翻译、通信助手与 Agent 模型评测，设计题集和标准，推动模型效果迭代。</li>
                <li>分析短剧消费 DAU 与留存漏斗，通过 A/B 实验验证内容分发策略并优化用户观看时长。</li>
              </ul>
              <div className="tag-row"><span>需求策划</span><span>模型评测</span><span>A/B 实验</span><span>内容分发</span></div>
            </div>
            <div className="experience-visual visual-violet"><span>AGENT<br />BROWSER</span><small>模型评测 · 内容策略 · 用户洞察</small></div>
          </article>

          <article className="experience-row reveal" id="experience-codexpert">
            <div className="experience-main">
              <div className="experience-head">
                <span className="experience-no">02</span>
                <div><h3>元数信息技术有限公司</h3><p>CodeXpert 云端编码智能体 · AI 产品经理</p></div>
                <time>2025.12 — 2026.04</time>
              </div>
              <ul>
                <li>参与 AI Coding Agent 从 MVP 到上线的完整推进，完成场景拆解、能力设计与测试验证。</li>
                <li>推动“需求—代码—测试—PR”任务链路打通，提升 AI 在真实研发工作流中的可用性。</li>
                <li>参与数据埋点方案与品牌物料设计，为功能分析、路径观察和产品转化建立基础。</li>
              </ul>
              <div className="tag-row"><span>Coding Agent</span><span>研发工作流</span><span>数据埋点</span><span>品牌设计</span></div>
            </div>
            <div className="experience-visual visual-amber"><span>CODE<br />XPERT</span><small>MVP · WORKFLOW · SHIPPING</small></div>
          </article>
        </section>

        <section className="projects section" id="projects">
          <div className="section-kicker reveal"><span>( 03 )</span><span>SELECTED PROJECTS</span></div>
          <h2 className="section-title reveal">三个产品，<br />三种真实问题。</h2>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project reveal" id={project.id} key={project.id}>
                <div className="project-info">
                  <div className="project-meta"><span>{project.no}</span><time>{project.date}</time></div>
                  <h3>{project.title}</h3>
                  <h4>{project.subtitle}</h4>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href={project.repo} target="_blank" rel="noreferrer" className="text-link">{project.repoLabel}</a>
                </div>
                <a href={project.repo} target="_blank" rel="noreferrer" className={`project-visual project-visual--${project.tone}`} aria-label={`查看 ${project.title} 的 GitHub`}>
                  <span className="project-ghost">{project.visualTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
                  <span className="project-open">OPEN ↗</span>
                  <span className="project-keywords">{project.keywords.map((keyword) => <small key={keyword}>{keyword}</small>)}</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <div className="section-kicker reveal"><span>( 04 )</span><span>CAPABILITIES</span></div>
          <div className="skills-intro reveal">
            <h2>不只写 PRD。<br /><span>我连接人、模型与业务。</span></h2>
            <p>稳定、善沟通、有推进节奏；建筑训练带来的空间感与审美，也让我习惯从结构与体验同时看待产品。</p>
          </div>
          <div className="skill-map reveal">
            <div className="skill-core"><span>AI</span><strong>PM</strong><small>BUILD THE BRIDGE</small></div>
            <div className="skill-node skill-node--one"><b>01 / 产品</b><span>用户研究</span><span>需求分析</span><span>PRD · 原型</span></div>
            <div className="skill-node skill-node--two"><b>02 / AI</b><span>RAG</span><span>Multi-Agent</span><span>Agent Harness</span></div>
            <div className="skill-node skill-node--three"><b>03 / 数据</b><span>SQL · Python</span><span>指标监控</span><span>埋点 · A/B 实验</span></div>
            <div className="skill-node skill-node--four"><b>04 / 交付</b><span>Figma</span><span>Vibe Coding</span><span>跨团队协作</span></div>
            <span className="orbit orbit--one" /><span className="orbit orbit--two" />
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="section-kicker reveal"><span>( 05 )</span><span>CONTACT</span></div>
          <div className="contact-layout">
            <h2 className="reveal">有一个值得做的<br />AI 产品想法？<br /><span>聊聊吧。</span></h2>
            <div className="contact-links reveal">
              <a href="mailto:3500788359@qq.com"><small>EMAIL</small><span>3500788359@qq.com</span><b>↗</b></a>
              <a href="tel:+8615952105455"><small>PHONE</small><span>159 5210 5455</span><b>↗</b></a>
              <a href="https://github.com/pear279" target="_blank" rel="noreferrer"><small>GITHUB</small><span>@pear279</span><b>↗</b></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Mark compact />
        <p>李慧珍 · AI PRODUCT MANAGER</p>
        <p>© 2026 NANJING, CHINA</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
