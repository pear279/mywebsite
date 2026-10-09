"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Brand } from "@/components/Brand";
import { WorkGallery } from "@/components/WorkGallery";
import { Skills } from "@/components/Skills";
import { Koala } from "@/components/Koala";
import { asset } from "@/data/projects";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline().from(".hero .brand-tile", { opacity: 0, y: 35, scale: .9, duration: .8, stagger: .075, ease: "power3.out" }).from(".hero-caption", { opacity: 0, y: 12, duration: .65 }, "-.35");
        gsap.to(".hero-signature", {
          y: -45,
          opacity: 0,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom 25%",
            scrub: 1,
          },
        });
        gsap.fromTo(
          ".fixed-brand",
          { autoAlpha: 0, y: -8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            scrollTrigger: {
              trigger: ".hero",
              start: "bottom 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".fixed-brand",
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0,
            scrollTrigger: {
              trigger: ".hero",
              start: "bottom 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("3500788359@qq.com");
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:3500788359@qq.com";
    }
  };
  return (
    <div ref={root}>
      <a href="#home" className="fixed-brand" aria-label="pear 279 返回首页">
        <Brand compact />
      </a>
      <header className="site-header">
        <button
          className="menu-toggle"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="main-nav"
        >
          {menu ? "关闭" : "菜单"}
        </button>
        <nav id="main-nav" className={menu ? "open" : ""} aria-label="主导航">
          {[
            ["作品", "#work"],
            ["经历", "#experience"],
            ["关于", "#about"],
            ["联系", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a href={asset("/resume.pdf")} target="_blank" rel="noreferrer">
            简历 ↗
          </a>
        </nav>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-top">
            <span>LI HUIZHEN / 李慧珍</span>
            <span>NANJING · CLASS OF 2027</span>
          </div>
          <div className="hero-signature">
            <h1>
              <Brand responsive />
            </h1>
            <div className="hero-caption">
              <span className="role-label">AI PRODUCT, HUMAN FIRST.</span>
              <p>
                <span>研究真实需求</span>
                <span>把想法做成产品</span>
              </p>
            </div>
          </div>
          <div className="hero-bottom">
            <span>AI 产品 / 市场 / 运营 / 数据</span>
            <a href="#work">
              探索我的作品 <span>↓</span>
            </a>
            <span>CURIOUS BY NATURE.</span>
          </div>
          <div className="hero-grain" aria-hidden="true" />
        </section>
        <section className="intro wrap" id="intro" data-reveal>
          <span className="eyebrow">A LITTLE ABOUT MY WAY</span>
          <h2>
            从人的感受出发，
            <br />
            把复杂的事做得自然。
          </h2>
          <p>
            我是李慧珍，建筑学出身的 AI 产品人。
            <br />
            习惯观察、拆解、构建，也喜欢为理性系统
            <br className="desktop-break" />
            留一点温度与想象力。
          </p>
          <a className="text-link" href="#about">
            认识我 <span>↗</span>
          </a>
        </section>
        <WorkGallery />
        <section className="experience wrap" id="experience">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">IN THE REAL WORLD</span>
              <h2>
                在真实业务里，
                <br />
                把事情向前推。
              </h2>
            </div>
            <p>
              研究 → 定义 → 协作 → 验证
              <br />
              两段实习，同一条产品主线。
            </p>
          </div>
          <details className="experience-row" open>
            <summary>
              <span className="experience-date">2026.05 — 2026.08</span>
              <h3>
                腾讯 <span>浏览器产品部 · Agent 组</span>
              </h3>
              <span className="experience-role">
                产品策划 <i>+</i>
              </span>
            </summary>
            <div className="experience-content">
              <p className="experience-lead">
                在浏览器场景中，寻找 AI 真正有用的时刻。
              </p>
              <div className="experience-columns">
                <div>
                  <h4>场景与需求</h4>
                  <p>
                    累计参与推进 9 个 P0 / P1 需求，覆盖 AI
                    信息订阅、智能填表、脚本 / Skill
                    创建等方向；协同设计、开发及法务对齐方案。
                  </p>
                </div>
                <div>
                  <h4>模型与体验</h4>
                  <p>
                    参与解读、翻译、通用助手与 Agent
                    评测，设计题集与规则，复盘失败场景，推动功能与模型效果迭代。
                  </p>
                </div>
                <div>
                  <h4>数据与判断</h4>
                  <p>
                    关注
                    DAU、功能渗透、复访与留存漏斗，结合用户行为与反馈，识别高价值任务和产品问题。
                  </p>
                </div>
              </div>
              <small>9 个需求为累计参与推进数量。</small>
            </div>
          </details>
          <details className="experience-row">
            <summary>
              <span className="experience-date">2025.12 — 2026.04</span>
              <h3>
                CodeXpert <span>元数信息技术 · 云端编码智能体</span>
              </h3>
              <span className="experience-role">
                AI 产品经理 <i>+</i>
              </span>
            </summary>
            <div className="experience-content">
              <p className="experience-lead">
                把开发任务组织成可交付的工作流。
              </p>
              <div className="experience-columns">
                <div>
                  <h4>MVP 到上线</h4>
                  <p>
                    参与需求拆解、AI
                    能力设计和测试验证，围绕研发场景推进产品迭代。
                  </p>
                </div>
                <div>
                  <h4>链路与转化</h4>
                  <p>
                    打通需求、代码、测试到 PR 的任务链路，参与新用户 Pro
                    权益与邀请奖励机制。
                  </p>
                </div>
                <div>
                  <h4>表达与数据</h4>
                  <p>
                    参与 Logo、落地页与核心功能埋点设计，使用 SQL
                    分析用户路径，为迭代提供依据。
                  </p>
                </div>
              </div>
            </div>
          </details>
        </section>
        <section className="practice wrap" id="practice" data-reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">BEYOND THE PRODUCT</span>
              <h2>也关心，如何连接更多人。</h2>
            </div>
            <p>
              市场洞察、内容表达与活动组织，
              <br />
              让产品价值走向真实的人群。
            </p>
          </div>
          <div className="practice-grid">
            <article>
              <div className="practice-image">
                <img
                  src={asset("/media/campus.webp")}
                  loading="lazy"
                  alt="校园义卖与活动组织的经历资料"
                />
              </div>
              <span className="eyebrow">校园经历 / ORGANIZE</span>
              <h3>把想法变成一场共同参与。</h3>
              <p>
                建筑学院学生会执行主席，3
                年学生会工作经历。组织校园义卖、运动会、合唱与专业交流；任内“一院一品”义卖募集
                10,210 元，部分用于捐赠与物资采购。
              </p>
            </article>
            <article className="market-study">
              <span className="eyebrow">求职研究案例 / MARKET STUDY</span>
              <h3>
                传播的承诺，
                <br />
                要与体验一致。
              </h3>
              <p>
                面向腾讯 IEG
                魔方市场岗位的研究与自我定位：从玩家人群、内容切入点与长期经营出发，思考如何表达产品价值。
              </p>
              <div className="study-flow">
                <span>理解人群</span>
                <i>↗</i>
                <span>内容表达</span>
                <i>↗</i>
                <span>验证反馈</span>
              </div>
              <p className="study-note">
                基于应聘准备文档整理，非魔方工作室实习经历。
              </p>
              <details>
                <summary>
                  展开我的市场与运营视角 <span>+</span>
                </summary>
                <p>
                  用访谈和反馈识别参与门槛；围绕不同人群选择信息与渠道；把节点、物料和协作组织起来；再用用户路径与转化数据检查判断。
                </p>
              </details>
            </article>
          </div>
        </section>
        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="about-photo" data-reveal>
              <img
                src={asset("/media/life-photo.webp")}
                alt="李慧珍的个人照片"
                loading="lazy"
              />
              <span>LI HUIZHEN / 李慧珍</span>
            </div>
            <div className="about-copy" data-reveal>
              <span className="eyebrow">A BUILDER WITH A SOFT SPOT</span>
              <h2>
                理性地构建。
                <br />
                感性地观察。
              </h2>
              <p>
                建筑学让我习惯看见人与环境的关系；产品实践让我把这种观察，延伸到用户任务、信息结构与系统规则。
              </p>
              <p>
                我喜欢从模糊的问题开始，和用户聊一聊，把线索整理成方案，再亲手把它做出来。关注
                AI 产品，也乐于参与市场、运营和数据工作。
              </p>
              <p>考拉是我的小小偏爱。慢一点观察，认真地行动。</p>
              <div className="education">
                <p>
                  <strong>南京大学 · 建筑学硕士</strong>
                  <span>2024.09 — 2027.06 / C9 · 985</span>
                </p>
                <p>
                  <strong>三江学院 · 建筑学学士</strong>
                  <span>2019.09 — 2024.06</span>
                </p>
              </div>
              <Skills />
              <a
                className="text-link"
                href={asset("/resume.pdf")}
                target="_blank"
                rel="noreferrer"
              >
                查看完整简历 ↗
              </a>
            </div>
          </div>
        </section>
        <section className="contact wrap" id="contact" data-reveal>
          <span className="eyebrow">LET&apos;S MAKE SOMETHING MATTER.</span>
          <h2>
            下一个好想法，
            <br />
            一起做出来。
          </h2>
          <div className="contact-bottom">
            <div>
              <p>
                期待 AI 产品机会，
                <br />
                也欢迎市场、运营与数据方向的交流。
              </p>
              <a className="email-link" href="mailto:3500788359@qq.com">
                3500788359@qq.com ↗
              </a>
              <button
                className="copy-email"
                onClick={copyEmail}
                aria-live="polite"
              >
                {copied ? "已复制 ✓" : "复制邮箱"}
              </button>
            </div>
            <div className="contact-social">
              <a
                href="https://github.com/pear279"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a href={asset("/resume.pdf")} download>
                下载简历 ↓
              </a>
              <a href="tel:+8615952105455">159 5210 5455 ↗</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a href="#home" aria-label="返回首页">
          <Brand compact />
        </a>
        <span>© 2026 李慧珍</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
      <Koala />
    </div>
  );
}
