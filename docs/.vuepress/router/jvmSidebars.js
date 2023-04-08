// JVM 侧边栏
const JVMSidebars = [
  {
    text: "JVM类加载机制",
    link: "/guide/JVM/ClassLoader.md",
  },
  {
    text: "JVM内存划分",
    link: "/guide/JVM/JVMMemory.md",
  },
  {
    text: "JVM垃圾回收机制",
    collapsible: true, // 侧边栏是否可折叠
    children: [
      {
        text: "判断对象是否已死",
        link: "/guide/JVM/ObjectIsDie.md",
      },
      {
        text: "常用垃圾回收算法",
        link: "/guide/JVM/RecyclingAlgorithm.md",
      },
    ],
  },
  
];
//   "/guide/Spring": [
//     {
//       text: "Reference",
//       children: ["/reference/cli.md", "/reference/config.md"],
//     },
//   ],
export default JVMSidebars;
