export default function ResumePage() {
  return (
    <section className="card">
      <h1>简历展示</h1>
      <p>已同步 `materials` 中的最新简历版本，支持网页浏览 + PDF 下载。</p>

      <div className="resumeBlock">
        <h2>核心信息</h2>
        <ul>
          <li>姓名：李慧珍（25 岁）</li>
          <li>所在城市：南京</li>
          <li>期待岗位：AI 产品 / 市场 / 运营</li>
          <li>联系方式：15952105455 · 3500788359@qq.com</li>
          <li>GitHub：github.com/pear279</li>
        </ul>
      </div>

      <div className="resumeBlock">
        <h2>教育经历</h2>
        <p>南京大学（C9 / 985） 建筑学硕士 2024.09 - 2027.06</p>
        <p>三江学院 建筑学学士 2019.09 - 2024.06</p>
      </div>

      <div className="resumeBlock">
        <h2>实习经历</h2>
        <ul>
          <li>腾讯 浏览器产品部 Agent 组（产品策划，2026.05 - 2026.08）：共参与 9 个 P0/P1 需求，覆盖 AI 信息订阅、智能填表、脚本/Skill 创建等方向。</li>
          <li>元数信息技术（CodeXpert，AI 产品经理，2025.12 - 2026.04）：推进 Coding Agent 从 MVP 到上线，打通“需求-代码-测试-PR”任务链路。</li>
        </ul>
      </div>

      <div className="resumeBlock">
        <h2>项目经历</h2>
        <ul>
          <li>moodseed（2025.02 - 2025.06）：107 份问卷 + 6 位用户深访，搭建情绪识别与 CBT 知识库，上线 `moodseed.pages.dev`，获江苏省青年创新创业大赛优秀奖。</li>
          <li>东方游（2025.11 - 至今）：面向海外游客的 AI 旅游导览产品，基于 React + TypeScript + Supabase + MapLibre 构建移动优先体验。</li>
          <li>SoundLens 音象（2026.02 - 2026.05）：听障辅助声音感知产品，基于 Next.js + Web Audio API 实现实时监测、异常提醒和状态机降噪。</li>
        </ul>
      </div>

      <a className="btn" href="/李慧珍-AI产品经理-简历.pdf" download>
        下载最新 PDF 简历
      </a>
    </section>
  );
}
