// 默认主题配置

// 默认主题
import { defaultTheme } from "@vuepress/theme-default";
// 头部导航栏
import navbars from "./router/navbar";
// 侧边栏
import sidebars from "./router/sidebars";


export default {
  base: '/full-stack-notes/',
  // base: '/FullStackNotes/',
  lang: "zh-CN", //语言设置
  title: "FullStackNotes", //所有页面标题的后缀
  description: "这是我的全栈学习笔记", //站点描述，它会被每个页面的 Frontmatter 中的 description 字段覆盖
  head: [
    ["link", { rel: "icon", href: "/images/quantou.png" }],
    ["link", { rel:"shortcut icon", type: "image/x-icon" ,href: "favicon.ico"}]
  ], // 浏览器 favicon
  pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'], // 排除所有的 README.md
  theme: defaultTheme({
    // 在这里进行配置
    navbar: navbars,
    sidebar: sidebars,
    sidebarOpen: true,
    // markdown:md,
    logo: "/images/quantou.png",
    markdown: {
      toc: {
          includeLevel:[1, 2, 3, 4]
      }
    }
  }),
};
