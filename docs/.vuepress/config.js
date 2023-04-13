// 默认主题配置

// 默认主题
import { defaultTheme } from "@vuepress/theme-default";
// 头部导航栏
import navbars from "./router/navbar";
// 侧边栏
import sidebars from "./router/sidebars";


export default {
  // 部署gitee的base
  base: '/full-stack-notes/',
  // 部署github的bash
  // base: '/FullStackNotes/',
  lang: "zh-CN", //语言设置
  title: "FullStackNotes", //所有页面标题的后缀
  description: "这是我的全栈学习笔记", //站点描述，它会被每个页面的 Frontmatter 中的 description 字段覆盖
  head: [
    ["link", { rel: "icon", href: "/FullStackNotes/images/quantou.png" }],

    // 部署gitee的favicon.ico
    // ["link", { rel:"shortcut icon", type: "favicon" ,href: "/full-stack-notes/images/favicon.ico"}]
    
    // 部署github的favicon.ico
    // ["link", { rel:"shortcut icon", type: "favicon" ,href: "/FullStackNotes/images/favicon.ico"}]
  ],
  pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'], // 排除所有的 README.md
  theme: defaultTheme({
    // 在这里进行配置
    navbar: navbars,
    // sidebar: sidebars,
    sidebarOpen: false,
    // markdown:md,
    logo: "/images/quantou.png",
    markdown: {
      toc: {
          includeLevel:[1, 2, 3, 4]
      }
    }
  }),
};
