// Redis 侧边栏
const RedisSidebars = [
  {
    text: "Redis命令和数据类型",
    link: "/guide/Redis/CommandAndType.md",
  },
  {
    text: "Redis工具类",
    link: "/guide/Redis/RedisUtils.md",
  },
  {
    text: "Redis客户端",
    link: "/guide/Redis/RedisClient.md",
  },
  {
    text: "Redis实战",
    collapsible: true, // 侧边栏是否可折叠
    children: [
      {
        text: "短信登录",
        link: "/guide/Redis/MessageLogin.md",
      },
      {
        text: "缓存",
        link: "/guide/Redis/Cache.md",
      },
    ],
  },
  {
    text: "Redis持久化",
    collapsible: true, // 侧边栏是否可折叠
    children: [
      {
        text: "RDB",
        link: "/guide/Redis/RDB.md",
      },
      {
        text: "AOF",
        link: "/guide/Redis/AOF.md",
      },
    ],
  },
  {
    text: "Redis主从",
    collapsible: true, // 侧边栏是否可折叠
    children: [
      {
        text: "搭建主从架构",
        link: "/guide/Redis/MasterSlave.md",
      },
      {
        text: "主从数据同步",
        link: "/guide/Redis/DataSynchronization.md",
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
export default RedisSidebars;
