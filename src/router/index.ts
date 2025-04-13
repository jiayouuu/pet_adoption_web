import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('@/views/front/Front.vue'),
    children: [
      { path: 'person', name: '个人信息', component: () => import('@/views/front/Person.vue')},
      { path: 'password', name: '修改密码', component: () => import('@/views/front/Password.vue')},
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('@/views/front/Home.vue')
      },
      {
        path: 'homeDetail',
        name: 'HomeDetail',
        component: () => import('@/views/front/HomeDetail.vue')
      },
      {
        path: 'adopt',
        name: 'Adopt',
        component: () => import('@/views/front/Adopt.vue')
      },
      {
        path: 'myAdopt',
        name: 'MyAdopt',
        component: () => import('@/views/front/MyAdopt.vue')
      },
      {
        path: 'salvation',
        name: 'Salvation',
        component: () => import('@/views/front/Salvation.vue')
      },
      {
        path: 'lost',
        name: 'Lost',
        component: () => import('@/views/front/Lost.vue')
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/front/Article.vue')
      },
      {
        path: 'articleKp',
        name: 'ArticleKp',
        component: () => import('@/views/ArticleKp.vue')
      },
    ]
  },
  { path: '/', name: 'Manage', component: () => import('@/views/Manage.vue'), redirect: "/login", children: [
    { path: 'person', name: '个人信息', component: () => import('@/views/front/Person.vue')},
    { path: 'password', name: '修改密码', component: () => import('@/views/front/Password.vue')},
      {
          path: "home",
          name: "主页",
          component: ()=> import('@/views/Home.vue'),
      },
      {
          path: "user",
          name: "用户管理",
          component: ()=> import('@/views/User.vue'),
      },
      {
          path: "role",
          name: "角色管理",
          component: ()=> import('@/views/Role.vue'),
      },
      {
          path: "menu",
          name: "菜单管理",
          component: ()=> import('@/views/Menu.vue'),
      },
      {
          path: "file",
          name: "文件管理",
          component: ()=> import('@/views/File.vue'),
      },
      {
          path: "notice",
          name: "公告管理",
          component: ()=> import('@/views/Notice.vue'),
      },
      {
          path: "animal",
          name: "流浪动物管理",
          component: ()=> import('@/views/Animal.vue'),
      },
      {
          path: "sterilization",
          name: "宠物绝育管理",
          component: ()=> import('@/views/Sterilization.vue'),
      },
      {
          path: "salvation",
          name: "流浪动物救助",
          component: ()=> import('@/views/Salvation.vue'),
      },
      {
          path: "lost",
          name: "宠物走失管理",
          component: ()=> import('@/views/Lost.vue'),
      },
      {
          path: "feed",
          name: "喂养点管理",
          component: ()=> import('@/views/Feed.vue'),
      },
      {
          path: "rescue",
          name: "救助站管理",
          component: ()=> import('@/views/Rescue.vue'),
      },
      {
          path: "applcation",
          name: "申请领养管理",
          component: ()=> import('@/views/Applcation.vue'),
      },
      {
          path: "comment",
          name: "评论管理",
          component: ()=> import('@/views/Comment.vue'),
      },
      {
          path: "article",
          name: "帖子管理",
          component: ()=> import('@/views/Article.vue'),
      },
      {
          path: "donate",
          name: "捐赠管理",
          component: ()=> import('@/views/Donate.vue'),
      },
      {
          path: "articleKp",
          name: "科普文章管理",
          component: ()=> import('@/views/ArticleKp.vue'),
      },
      {
          path: "activity",
          name: "活动管理",
          component: ()=> import('@/views/Activity.vue'),
      }
  ] }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称
  store.commit("setPath")
  if (!to.matched.length) {
    const menus = localStorage.getItem("menus")
    if (!menus) {
      next("/login")
    } else {
      next("/404")
    }
  } else {
    next()
  }
})

export default router
