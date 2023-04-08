// RabbitMQ 侧边栏
const RabbitMQSidebars = [
  {
    text: "Docker安装MQ",
    link: "/guide/RabbitMQ/InstallMQ.md",
  },
  {
    text: "消息队列模式",
    link: "/guide/RabbitMQ/MqModel.md",
  },
  {
    text: "消息可靠性",
    link: "/guide/RabbitMQ/MessageReliability.md",
  },
  {
    text: "延迟队列（死信交换机）",
    link: "/guide/RabbitMQ/DelayQueue.md",
  },
  {
    text: "惰性队列",
    link: "/guide/RabbitMQ/LazyQueue.md",
  },
  {
    text: "MQ集群",
    collapsible: true, // 侧边栏是否可折叠
    children: [
      {
        text: "普通集群",
        link: "/guide/RabbitMQ/NormalCluster.md",
      },
      {
        text: "镜像集群",
        link: "/guide/RabbitMQ/MirrorCluster.md",
      },
      {
        text: "仲裁队列",
        link: "/guide/RabbitMQ/ArbitrationQueue.md",
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
export default RabbitMQSidebars;
