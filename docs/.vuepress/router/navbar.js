// text：展示的标题
// link：链接去的页面
// children：子页面
const navbars = [
  {
    text: "JVM",
    link: "/guide/JVM/ClassLoader.md",
  },
  {
    text: "微服务组件",
    children: [
      {
        text: "Nacos",
        link: "/guide/SpringCloud/Nacos/InstallNacos.md",
      },
      {
        text: "Feign",
        link: "/guide/SpringCloud/Feign/Feign.md",
      },
      {
        text: "Gateway",
        link: "/guide/SpringCloud/Gateway/Gateway.md",
      },
    ],
  },
  {
    text: "数据库",
    children: [
      {
        text: "MySQL",
        link: "/guide/MySQL/MySQL.md",
      },
    ],
  },
  {
    text: "Linux",
    children: [
      {
        text: "Linux",
        link: "/guide/Linux/LinuxBase.md",
      },
      {
        text: "Shell脚本",
        link: "/guide/Others/ShellScript.md",
      },
    ],
  },
  {
    text: "后端技术",
    children: [
      {
        text: "Java",
        link: "/guide/Java/JavaBase.md",
      },
      {
        text: "MyBatis",
        link: "/guide/MyBatis/MyBatis.md",
      },
      {
        text: "Spring系列",
        children: [
          {
            text: "Spring",
            link: "/guide/Spring/SpringIOC.md",
          },
          {
            text: "SpringBoot",
            link: "/guide/SpringBoot/JSON.md",
          },
        ],
      },
      {
        text: "中间件",
        children: [
          {
            text: "Redis",
            link: "/guide/Redis/Redis.md",
          },
          {
            text: "RabbitMQ",
            link: "/guide/RabbitMQ/RabbitMQ.md",
          },
        ],
      },
      {
        text: "工具",
        children: [
          {
            text: "Git",
            link: "/guide/Git/Git.md",
          },
          {
            text: "Docker",
            link: "/guide/Docker/DockerCommand.md",
          },
        ],
      },
    ],
  },
  {
    text: "前端技术",
    children: [
      {
        text: "Vue2",
        link: "/guide/Vue2/Vue2.md",
      },
      {
        text: "Vue3",
        link: "/guide/Vue3/Vue3.md",
      },
      {
        text: "JavaScript",
        link: "/guide/JavaScript/VariablesAndTypes.md",
      },
      {
        text: "TypeScript",
        link: "/guide/TypeScript/TypeScript.md",
      },
    ],
  },
  // {
  //   text: "设计模式",
  //   link: "/guide/DesignPatterns/DesignPatterns.md",
  // },
  {
    text: "算法",
    children: [
      {
        text: "查找算法",
        link: "/guide/Algorithm/search/BinarySearch.md",
      },
      {
        text: "排序算法",
        link: "/guide/Algorithm/sort/BubbleSort.md",
      },
      {
        text: "LeetCode刷题记录",
        link: "/guide/Algorithm/LeetCode.md",
      },
      // {
      //   text: "华为机试",
      //   link: "/ctest.md",
      // },
    ],
  },
  {
    text: "项目",
    children: [
      {
        text: "vue-element-admin",
        link: "/guide/Vue2/Vue-element.md",
      },
    ],
  },
  {
    text: "Gitee",
    link: "https://gitee.com/linwei-zhang/full-stack-notes",
  },
];

export default navbars;
