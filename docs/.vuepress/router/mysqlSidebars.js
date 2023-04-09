// MySQL 侧边栏
const MysqlSidebars =  [
    {
      text: "MySQL",
      sidebar: "auto",
      collapsible: true, // 侧边栏是否可折叠
      children: [
        {
          text: "数据类型",
          link: "/guide/MySQL/DataType.md",
        },
        {
          text: "运算符",
          link: "/guide/MySQL/Operator.md",
        },
        {
          text: "常见函数",
          link: "/guide/MySQL/Function.md",
        },
        {
          text: "权限",
          link: "/guide/MySQL/Permissions.md",
        },
        {
          text: "约束",
          link: "/guide/MySQL/Constraint.md",
        },
      ],
    },
    {
      text: "SQL语法",
      collapsible: true, // 侧边栏是否可折叠
      children: [
        {
          text: "DDL",
          link: "/guide/MySQL/DDL.md",
        },
        {
          text: "DQL",
          link: "/guide/MySQL/DQL.md",
        },
        {
          text: "DML",
          link: "/guide/MySQL/DML.md",
        },
        {
          text: "DCL",
          link: "/guide/MySQL/DCL.md",
        },
      ],
    },
    {
      text: "多表查询",
      link: "/guide/MySQL/MultiTableQuery.md",
    },
    {
      text: "MySQL事务",
      link: "/guide/MySQL/Transactional.md",
    },
    {
      text: "存储引擎",
      link: "/guide/MySQL/Engine.md",
    },
    {
      text: "索引",
      link: "/guide/MySQL/MySQLIndex.md",
    },
  ]
//   "/guide/Spring": [
//     {
//       text: "Reference",
//       children: ["/reference/cli.md", "/reference/config.md"],
//     },
//   ],
;

export default MysqlSidebars;
