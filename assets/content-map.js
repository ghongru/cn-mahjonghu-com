const contentSections = [
  {
    id: "home",
    title: "首页",
    keywords: ["麻将胡了", "在线棋牌", "休闲娱乐", "游戏大厅"],
    summary: "平台首页展示，包含热门推荐和快速入口",
    url: "https://cn-mahjonghu.com"
  },
  {
    id: "news",
    title: "新闻公告",
    keywords: ["麻将胡了", "更新日志", "活动公告", "版本资讯"],
    summary: "发布平台最新动态与版本更新内容",
    url: "https://cn-mahjonghu.com/news"
  },
  {
    id: "guide",
    title: "玩法指南",
    keywords: ["麻将胡了", "规则说明", "技巧分享", "新手教程"],
    summary: "详细介绍麻将胡了各种玩法与策略",
    url: "https://cn-mahjonghu.com/guide"
  },
  {
    id: "community",
    title: "玩家社区",
    keywords: ["麻将胡了", "论坛", "玩家交流", "讨论专区"],
    summary: "玩家互动交流，分享游戏心得与经验",
    url: "https://cn-mahjonghu.com/community"
  },
  {
    id: "support",
    title: "客服支持",
    keywords: ["麻将胡了", "帮助中心", "客服", "常见问题"],
    summary: "提供客服渠道与FAQ自助查询",
    url: "https://cn-mahjonghu.com/support"
  }
];

const extraTags = ["麻将胡了", "棋牌", "休闲", "竞技", "经典"];

function searchContent(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results = [];
  for (const section of contentSections) {
    const titleMatch = section.title.toLowerCase().includes(q);
    const summaryMatch = section.summary.toLowerCase().includes(q);
    const keywordMatch = section.keywords.some(k => k.toLowerCase().includes(q));
    const urlMatch = section.url.toLowerCase().includes(q);

    if (titleMatch || summaryMatch || keywordMatch || urlMatch) {
      results.push({
        id: section.id,
        title: section.title,
        summary: section.summary,
        url: section.url,
        matchedKeywords: section.keywords.filter(k => k.toLowerCase().includes(q))
      });
    }
  }

  if (results.length === 0) {
    const tagMatch = extraTags.filter(t => t.toLowerCase().includes(q));
    if (tagMatch.length > 0) {
      results.push({
        id: null,
        title: "相关标签",
        summary: `未找到直接匹配的内容，但发现相关标签：${tagMatch.join("、")}`,
        url: null,
        matchedKeywords: tagMatch
      });
    }
  }

  return results;
}

function getSectionById(id) {
  return contentSections.find(s => s.id === id) || null;
}

function getAllKeywords() {
  const set = new Set();
  for (const section of contentSections) {
    for (const kw of section.keywords) {
      set.add(kw);
    }
  }
  for (const tag of extraTags) {
    set.add(tag);
  }
  return Array.from(set);
}

function filterByKeyword(keyword) {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [];
  return contentSections.filter(section =>
    section.keywords.some(k => k.toLowerCase().includes(kw))
  );
}

function listAllSections() {
  return contentSections.map(s => ({
    id: s.id,
    title: s.title,
    url: s.url
  }));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentSections,
    extraTags,
    searchContent,
    getSectionById,
    getAllKeywords,
    filterByKeyword,
    listAllSections
  };
}