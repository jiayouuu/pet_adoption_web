export const menus= [
    {
      id: 10,
      name: "主页",
      path: "/home",
      icon: "iconfont icon-r-home",
      description: null,
      children: [],
      pid: null,
      pagePath: "Home",
      sortNum: "0"
    },
    {
      id: 4,
      name: "系统管理",
      path: null,
      icon: "iconfont icon-r-setting",
      description: null,
      children: [
        {
          id: 5,
          name: "用户管理",
          path: "/user",
          icon: "iconfont icon-r-user2",
          description: null,
          children: null,
          pid: 4,
          pagePath: "User",
          sortNum: "301"
        },
        {
          id: 6,
          name: "角色管理",
          path: "/role",
          icon: "iconfont icon-r-user3",
          description: null,
          children: null,
          pid: 4,
          pagePath: "Role",
          sortNum: "302"
        },
        {
          id: 7,
          name: "菜单管理",
          path: "/menu",
          icon: "iconfont icon-r-setting",
          description: null,
          children: null,
          pid: 4,
          pagePath: "Menu",
          sortNum: "303"
        },
        {
          id: 8,
          name: "文件管理",
          path: "/file",
          icon: "iconfont icon-r-paper",
          description: null,
          children: null,
          pid: 4,
          pagePath: "File",
          sortNum: "304"
        },
        {
          id: 22,
          name: "公告管理",
          path: "/notice",
          icon: "iconfont icon-r-edit",
          description: null,
          children: null,
          pid: 4,
          pagePath: "Notice",
          sortNum: "305"
        }
      ],
      pid: null,
      pagePath: null,
      sortNum: "300"
    },
    {
      id: 25,
      name: "宠物管理",
      path: null,
      icon: "iconfont icon-r-love",
      description: null,
      children: [
        {
          id: 11,
          name: "流浪动物管理",
          path: "/animal",
          icon: "iconfont icon-r-love",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Animal",
          sortNum: "401"
        },
        {
          id: 12,
          name: "宠物绝育管理",
          path: "/sterilization",
          icon: "iconfont icon-r-refresh",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Sterilization",
          sortNum: "402"
        },
        {
          id: 15,
          name: "流浪动物救助",
          path: "/salvation",
          icon: "iconfont icon-r-love",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Salvation",
          sortNum: "403"
        },
        {
          id: 18,
          name: "宠物走失管理",
          path: "/lost",
          icon: "iconfont icon-r-no",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Lost",
          sortNum: "404"
        },
        {
          id: 16,
          name: "喂养点管理",
          path: "/feed",
          icon: "iconfont icon-r-building",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Feed",
          sortNum: "405"
        },
        {
          id: 19,
          name: "救助站管理",
          path: "/rescue",
          icon: "iconfont icon-r-building",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Rescue",
          sortNum: "406"
        },
        {
          id: 13,
          name: "申请领养管理",
          path: "/applcation",
          icon: "iconfont icon-r-add",
          description: null,
          children: null,
          pid: 25,
          pagePath: "Applcation",
          sortNum: "407"
        }
      ],
      pid: null,
      pagePath: null,
      sortNum: "400"
    },
    {
      id: 26,
      name: "其他管理",
      path: null,
      icon: "iconfont icon-r-list",
      description: null,
      children: [
        {
          id: 14,
          name: "评论管理",
          path: "/comment",
          icon: "iconfont icon-r-team",
          description: null,
          children: null,
          pid: 26,
          pagePath: "Comment",
          sortNum: "501"
        },
        {
          id: 20,
          name: "帖子管理",
          path: "/article",
          icon: "iconfont icon-r-edit",
          description: null,
          children: null,
          pid: 26,
          pagePath: "Article",
          sortNum: "502"
        },
        {
          id: 21,
          name: "捐赠管理",
          path: "/donate",
          icon: "iconfont icon-r-yes",
          description: null,
          children: null,
          pid: 26,
          pagePath: "Donate",
          sortNum: "503"
        },
        {
          id: 23,
          name: "科普文章管理",
          path: "/articleKp",
          icon: "iconfont icon-r-edit",
          description: null,
          children: null,
          pid: 26,
          pagePath: "ArticleKp",
          sortNum: "504"
        },
        {
          id: 24,
          name: "活动管理",
          path: "/activity",
          icon: "iconfont icon-r-mark1",
          description: null,
          children: null,
          pid: 26,
          pagePath: "Activity",
          sortNum: "505"
        }
      ],
      pid: null,
      pagePath: null,
      sortNum: "500"
    }
  ]