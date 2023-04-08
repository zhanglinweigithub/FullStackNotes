// Linux 侧边栏
const LinuxSidebars =  [
    {
      text: "Linux",
      collapsible: true, // 侧边栏是否可折叠
      children: [
        {
            text: "Linux基础知识",
            link: "/guide/Linux/LinuxBase.md",
          },
        {
          text: "Linux目录结构",
          link: "/guide/Linux/LinuxToc.md",
        }
      ],
    },
    {
        text: "Linux常用命令",
        link: "/guide/Linux/LinuxCommons.md",
    },
    {
        text: "VI编辑器",
        collapsible: true, // 侧边栏是否可折叠
        children: [
          {
              text: "命令模式快捷键",
              link: "/guide/Linux/VICommandMode.md",
            },
          {
            text: "底线模式快捷键",
            link: "/guide/Linux/VIBottomLineMode.md",
          }
        ],
      },
    
  ]
//   "/guide/Spring": [
//     {
//       text: "Reference",
//       children: ["/reference/cli.md", "/reference/config.md"],
//     },
//   ],
;

export default LinuxSidebars;
