export type BookmarkCategory = {
  category: string;
  links: { title: string; url: string; note: string }[];
};

export const bookmarkCategories: BookmarkCategory[] = [
  {
    category: 'Agent 学习资料',
    links: [
      {
        title: 'Hello Agents - Datawhale',
        url: 'https://github.com/datawhalechina/hello-agents',
        note: 'Agent 入门与实践项目集合'
      },
      {
        title: 'mini-coding-agent',
        url: 'https://github.com/rasbt/mini-coding-agent',
        note: '轻量级 coding agent 示例项目'
      },
      {
        title: 'Karpathy: Software in the era of AI',
        url: 'https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f',
        note: '关于 AI 时代软件形态的思考'
      },
      {
        title: 'wiki-compiler',
        url: 'https://github.com/zhangpelf/wiki-compiler',
        note: '面向知识整理的工具项目'
      }
    ]
  },
  {
    category: 'AI 工具平台',
    links: [
      {
        title: '小米 MIMO AI Studio',
        url: 'https://aistudio.xiaomimimo.com/#/',
        note: '模型体验与开发平台'
      }
    ]
  }
];
