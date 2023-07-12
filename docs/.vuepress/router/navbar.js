// text：展示的标题
// link：链接去的页面
// children：子页面
const navbars = [
  {
    text: "小程序",
    children: [
      {
        text: "前置知识",
        link: "/guide/Applets/AppletsBefore.md",
      },
      {
        text: "开发知识",
        link: "/guide/Applets/Applets.md",
      },
    ],
  },
  {
    text: "Java",
    children: [
      {
        text: "Java基础",
        link: "/guide/Java/JavaBase.md",
      },
      {
        text: "Java集合",
        link: "/guide/Java/Collection.md",
      },
      {
        text: "Java并发",
        link: "/guide/Java/JavaJUC.md",
      },
      {
        text: "JavaIO",
        link: "/guide/Java/JavaIO.md",
      },
      {
        text: "Java虚拟机",
        link: "/guide/Java/JVM.md",
      },
    ]
  },
  {
    text: "Java框架",
    children: [
      {
        text: "Spring",
        link: "/guide/JavaFrame/Spring.md",
      },
      {
        text: "SpringBoot",
        link: "/guide/JavaFrame/SpringBoot.md",
      },
      {
        text: "MyBatis",
        link: "/guide/JavaFrame/MyBatis.md",
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
    text: "微服务组件",
    children: [
      {
        text: "Nacos",
        link: "/guide/SpringCloud/Nacos/Nacos.md",
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
    text: "工具",
    children: [
      {
        text: "Git",
        link: "/guide/Git/Git.md",
      },
      {
        text: "Docker",
        link: "/guide/Docker/Docker.md",
      },
      {
        text: "Hutools",
        link: "/guide/Hutools/Hutools.md",
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
        link: "/guide/JavaScript/JavaScript.md",
      },
      {
        text: "TypeScript",
        link: "/guide/TypeScript/TypeScript.md",
      },
      {
        text: "Nginx",
        link: "/guide/Nginx/Nginx.md",
      },
    ],
  },
  {
    text: "算法",
    children: [
      {
        text: "基础",
        link: "/guide/Algorithm/AlgorithmBase.md",
      },
      {
        text: "LeetCode 题解",
        link: "/guide/Algorithm/LeetCodeAnswer.md",
      },
      {
        text: "刷题记录",
        link: "/guide/Algorithm/LeetCodeRecord.md",
      },
      // {
      //   text: "华为机试",
      //   link: "/ctest.md",
      // },
    ],
  },
  {
    text: "Linux",
    children: [
      {
        text: "Linux",
        link: "/guide/Linux/Linux.md",
      },
      {
        text: "Shell脚本",
        link: "/guide/Shell/ShellScript.md",
      },
    ],
  },
  {
    text: "项目",
    children: [
      {
        text: "vue-element-admin",
        link: "/guide/Project/Vue-element.md",
      },
    ],
  },
  {
    text: "其它",
    children: [
      {
        text: "设计模式",
        children: [
          {
            text: "行为型",
            link: "/guide/DesignPatterns/Behavior.md",
          },
          {
            text: "创建型",
            link: "/guide/DesignPatterns/Create.md",
          },
          {
            text: "结构型",
            link: "/guide/DesignPatterns/Structure.md",
          }
        ]
      },
      {
        text: "MarkDown",
        children: [
          {
            text: "MarkDown语法",
            link: "/guide/MarkDown/MarkDownCMD.md",
          },
          {
            text: "MarkDown图标",
            link: "/guide/MarkDown/MarkDownIcon.md",
          }
        ]
      },
      {
        text: "实用网站",
        children: [
          {
            text: "实用网站汇总",
            link: "/guide/WebSite/WebSite.md",
          }
        ]
      },
    ],
  },
  // {
  //   text: "Gitee",
  //   link: "https://gitee.com/linwei-zhang/full-stack-notes",
  // },
];

export default navbars;
