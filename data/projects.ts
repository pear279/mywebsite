export type Project = {
  slug: string;
  title: string;
  chinese: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  role: string;
  repo: string;
  live?: string;
  color: string;
  images: string[];
  metrics: [string, string][];
  problem: string;
  decisions: { title: string; body: string }[];
  outcome: string;
};
export const projects: Project[] = [
  {
    slug: "china-stroll",
    title: "China Stroll",
    chinese: "东方游",
    category: "AI 产品",
    year: "2025 — NOW",
    tagline: "把陌生的城市，变成安心的旅程。",
    description:
      "面向海外赴京游客的 AI 旅行伙伴。可信景点、共享行程、实时地图与来华工具，共用一个旅行上下文。",
    role: "产品共创 · 用户研究 · 体验设计 · AI 辅助开发",
    repo: "https://github.com/pear279/China-Stroll",
    live: "https://china-stroll.pages.dev",
    color: "china",
    images: ["china-home", "china-places", "china-trip"],
    metrics: [
      ["17", "位留学生访谈"],
      ["37", "组海外家庭实地调研"],
      ["20", "个审核后可发布景点"],
    ],
    problem:
      "旅行途中，景点信息、地图、预约与同行安排分散在不同入口。游客需要理解眼前地点、决定下一站，也需要让同行者跟上最新安排。",
    decisions: [
      {
        title: "先让信息可信，再让 AI 开口",
        body: "动态信息关联来源与更新时间；无法确认时保留复查提示。先审核景点内容与坐标，再提供问答和推荐，接受更慢的扩展，换取更清晰的发布标准。",
      },
      {
        title: "四个入口，共享一份行程",
        body: "景点负责发现，地图负责空间理解，工具解决现场问题，我的管理成员与日程。地点与行程保持一致，避免每个模块各自保存一份不同的安排。",
      },
      {
        title: "AI 提议，用户决定",
        body: "行程改动先生成结构化建议，再预览影响并由用户确认。位置共享默认关闭；产品把可控与可信作为能力边界。",
      },
    ],
    outcome:
      "已部署可体验 PWA，完成景点、地图、旅行工具与共享行程的关键链路。持续迭代内容可信度与 AI 建议体验。",
  },
  {
    slug: "moodseed",
    title: "Moodseed",
    chinese: "情绪植物拼图",
    category: "AI 产品",
    year: "2025",
    tagline: "记录一件事，让情绪慢慢长成植物。",
    description:
      "情绪记录、AI 认知反馈与植物拼图成长。把低门槛表达和温和的持续反馈放在同一条路径上。",
    role: "产品设计 · 用户研究 · AI 辅助开发",
    repo: "https://github.com/pear279/moodseed",
    live: "https://moodseed.pages.dev",
    color: "mood",
    images: ["mood-home", "mood-record", "mood-analysis"],
    metrics: [
      ["107", "份有效问卷"],
      ["6", "位用户深访"],
      ["优秀奖", "江苏省青年创新创业大赛"],
    ],
    problem:
      "年轻用户并非没有情绪，而是缺少不被打扰、容易坚持的表达方式。记录的价值需要在当下可感知，不能变成另一项负担。",
    decisions: [
      {
        title: "让记录比打卡更轻",
        body: "围绕情绪忽视、疏导打扰等痛点，组织轻量记录入口和情绪标签，降低开始表达的门槛。",
      },
      {
        title: "用结构化反馈帮助理解",
        body: "基于 CBT 认知框架，输出情绪标签、总结、原因与建议，并设置敏感内容兜底机制。AI 反馈服务于自我理解。",
      },
      {
        title: "把坚持变成看得见的成长",
        body: "用碎片奖励与植物拼图，把一次记录连接到一个长期的成长过程。反馈温和，不以强提醒催促用户。",
      },
    ],
    outcome:
      "完成移动端产品并部署上线，荣获江苏省青年创新创业大赛数字经济赛道优秀奖。",
  },
  {
    slug: "koala-pet",
    title: "Koala Pet",
    chinese: "AI 任务桌宠",
    category: "交互实验",
    year: "2026",
    tagline: "等待 AI 工作时，也有一个小伙伴。",
    description:
      "把执行、待确认、完成与异常状态转译为考拉动作。可以拖拽、投喂和玩耍的桌面伙伴。",
    role: "个人项目 · 状态设计 · 角色体验 · AI 辅助开发",
    repo: "https://github.com/pear279/koala-pet",
    color: "koala",
    images: ["koala-screen"],
    metrics: [
      ["状态", "可感知的任务反馈"],
      ["互动", "拖拽 / 投喂 / 玩耍"],
    ],
    problem:
      "等待 AI 任务时，我容易切换页面、错过确认或完成提示。状态反馈如果只是一行日志，既不直观，也缺少陪伴感。",
    decisions: [
      {
        title: "先定义状态，再赋予表情",
        body: "将任务执行、等待确认、完成和异常拆开，让角色动作承担清晰的反馈作用。",
      },
      {
        title: "陪伴不打断工作",
        body: "悬浮角色留在视野边缘，提供投喂与玩耍等主动交互，不遮挡主要操作区域。",
      },
      {
        title: "从个人痛点到可安装版本",
        body: "从自身使用场景出发，完成动作素材、状态映射和安装版本，把一个小想法做成可以运行的插件。",
      },
    ],
    outcome:
      "完成 DSH Web GUI 桌宠插件。本站的小考拉也采用同一套原创动作素材，可以试着点一点。",
  },
  {
    slug: "soundlens",
    title: "SoundLens",
    chinese: "音象",
    category: "交互实验",
    year: "2026",
    tagline: "让听不见的声音，也能被看见。",
    description:
      "面向听障人士的环境声音感知实验。实时声波、异常波动与停顿检测，把声音变化转化为视觉提示。",
    role: "个人项目 · 交互设计 · Vibe coding",
    repo: "https://github.com/pear279/SoundLens",
    color: "sound",
    images: [],
    metrics: [
      ["实时", "环境声音可视化"],
      ["状态机", "减少误报与抖动"],
    ],
    problem:
      "当环境异常只能被听见，听障人士就容易错过变化。产品需要把连续、复杂的声音信号转为可理解的视觉状态。",
    decisions: [
      {
        title: "从信号到可读状态",
        body: "通过 Web Audio API 分析 RMS 与峰值，组织实时声音波形和异常提醒。",
      },
      {
        title: "避免提示反复跳动",
        body: "识别持续高噪与长静音，并使用状态机控制切换，减少误报和视觉抖动。",
      },
      {
        title: "让核心体验先成立",
        body: "基于 Next.js、TypeScript 与 Supabase 完成可运行版本，以实时监测和反馈链路作为产品验证重点。",
      },
    ],
    outcome:
      "完成实时监测、声音可视化、异常提醒与停顿检测的核心产品实验。项目代码公开，继续探索更易理解的状态表达。",
  },
];
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
