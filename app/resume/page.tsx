export default function ResumePage() {
  return (
    <section className="card">
      <h1>简历展示</h1>
      <p>当前支持网页展示 + PDF 下载（双模式）。</p>

      <div className="resumeBlock">
        <h2>核心信息</h2>
        <ul>
          <li>目标岗位：AI 产品经理实习生</li>
          <li>技能方向：RAG、LangGraph、Multi-Agent、前端 Demo 快速验证</li>
          <li>亮点：可独立完成产品需求分析 → 方案设计 → Demo 验证 → 协同上线</li>
        </ul>
      </div>

      <div className="resumeBlock">
        <h2>教育经历</h2>
        <p>南京大学 建筑学（硕士） 2024.09 - 2027.06</p>
        <p>三江学院 建筑学（学士） 2019.09 - 2024.06</p>
      </div>

      <div className="resumeBlock">
        <h2>项目与实习（节选）</h2>
        <ul>
          <li>CodeXpert 云端编码智能体：负责产品流程打通与测试验证。</li>
          <li>moodseed 情绪社交产品：完成需求分析、系统设计与 Demo 实现。</li>
          <li>AI 旅游导览产品：参与 Multi-Agent 协作架构与知识库搭建。</li>
        </ul>
      </div>

      <a className="btn" href="/resume.pdf" download>
        下载 PDF 简历（请将文件命名为 public/resume.pdf）
      </a>
    </section>
  );
}
