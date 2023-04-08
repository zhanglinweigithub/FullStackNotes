// 默认主题配置

// 默认主题
import { defaultTheme } from "@vuepress/theme-default";
import MarkdownIt from 'markdown-it';
import { headersPlugin } from '@mdit-vue/plugin-headers';
// import type { MarkdownItEnv } from '@mdit-vue/types';
// 头部导航栏
import navbars from "./router/navbar";
// 侧边栏
import sidebars from "./router/sidebars";

const md = MarkdownIt({ html: true }).use(headersPlugin, {
  // options
  level: [1, 2, 3, 4]
});
// const env: MarkdownItEnv = {};

const rendered = md.render(
  `\
# h1
## h2
### h3
`,
);

export default {
  lang: "zh-CN", //语言设置
  title: "FullStackNotes", //所有页面标题的后缀
  description: "这是我的全栈学习笔记", //站点描述，它会被每个页面的 Frontmatter 中的 description 字段覆盖
  head: [["link", { rel: "icon", href: "/images/quantou.png" }]], // 浏览器 favicon
  markdown: {
    toc: {
        includeLevel:[1, 2, 3, 4]
    }
  },
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
