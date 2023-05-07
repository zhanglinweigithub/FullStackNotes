// 默认主题配置

// 默认主题
import { defaultTheme } from "@vuepress/theme-default";
// 头部导航栏
import navbars from "./router/navbar";
// 侧边栏
import sidebars from "./router/sidebars";
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

export default {
  
  base: '/full-stack-notes/', // 部署gitee的base
  // base: '/FullStackNotes/', // 部署github的base
  lang: "zh-CN",              //语言设置
  title: "FullStackNotes",    //所有页面标题的后缀
  description: "这是我的全栈学习笔记", //站点描述，它会被每个页面的 Frontmatter 中的 description 字段覆盖
  head: [
    ["link", { rel: "icon", href: "/full-stack-notes/images/quantou.png" }],    // 部署gitee的favcion
    // ["link", { rel: "icon", href: "/FullStackNotes/images/quantou.png" }],   // 部署github的favcion
  ],
  pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],    // 排除所有的 README.md
  theme: defaultTheme({
    navbar: navbars,    // 在这里进行配置
    sidebarOpen: false, // sidebar: sidebars,
    logo: "/images/quantou.png",
    repo: 'https://gitee.com/linwei-zhang/full-stack-notes',
    repoLabel: 'Gitee',
    editLink: false,
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    backToHome: '返回首页'
  }),
  plugins: [
    // 搜索框
    searchPlugin({
      // 配置项
      maxSuggestions: 10,   // 展示10条搜索内容
    })
  ],
  
};