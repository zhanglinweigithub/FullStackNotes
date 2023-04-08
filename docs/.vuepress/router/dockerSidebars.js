// Docker 侧边栏
const DockerSidebars = [
  {
    text: "Docker命令汇总",
    link: "/guide/Docker/DockerCommand.md",
  },
  {
    text: "安装",
    collapsible: true, // 侧边栏是否可折叠
    children: [
      {
        text: "CentOS7安装Docker",
        link: "/guide/Docker/InstallDocker.md",
      },
      {
        text: "CentOS安装DockerCompose",
        link: "/guide/Docker/InstallDockerCompose.md",
      },
    ],
  },
  {
    text: "Docker基本操作",
    link: "/guide/Docker/DockerBase.md",
  },
  {
    text: "DockerFile构建镜像",
    link: "/guide/Docker/DockerFile.md",
  },
  {
    text: "DockerCompose",
    link: "/guide/Docker/DockerCompose.md",
  },
  {
    text: "Docker镜像仓库",
    link: "/guide/Docker/DockerRepository.md",
  },
];
//   "/guide/Spring": [
//     {
//       text: "Reference",
//       children: ["/reference/cli.md", "/reference/config.md"],
//     },
//   ],
export default DockerSidebars;
