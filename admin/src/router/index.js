import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
  path: '/login',
  component: () =>
		import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () =>
		import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () =>
			import('@/views/dashboard/index'),
    meta: { title: '趣味问答', icon: 'dashboard' }
  }]
},
{
  // 关卡
  path: '/censorship',
  name: 'censorship',
  redirect: '/censorship/index',
  component: Layout,
  meta: { title: '关卡', icon: 'table' },
  children: [{
    path: 'manage',
    name: 'Manage',
    component: () =>
			import('@/views/censorship/index'),
    meta: { title: '关卡管理', icon: 'tree' }
  },
  {
    path: 'set',
    name: 'Set',
    component: () =>
			import('@/views/censorship/index'),
    meta: { title: '关卡设置', icon: 'table' }
  }
  ]
},

{
  // 奖项
  path: '/award',
  name: 'award',
  redirect: '/award/index',
  component: Layout,
  meta: { title: '奖项', icon: 'table' },
  children: [{
    path: 'awardmanage',
    name: 'awardManage',
    component: () =>
			import('@/views/award/index'),
    meta: { title: '奖项管理', icon: 'tree' }
  },
  {
    path: 'awardset',
    name: 'awardSet',
    component: () =>
			import('@/views/award/awardset'),
    meta: { title: '奖项设置', icon: 'table' }
  },
  {
    path: 'trophyset',
    name: 'trophySet',
    meta: { title: '奖品设置', icon: 'table' },
    component: () =>
			import('@/views/award/trophyset')
  },
  {
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: { title: '榜单', icon: 'table' },
    children: [
      {
        path: 'menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Menu1-1',
        meta: { title: '闯关积分' }
      },
      {
        path: 'menu1-2',
        component: () => import('@/views/nested/menu1/menu1-2'),
        name: 'Menu1-2',
        meta: { title: '获奖情况' }
      },
      {
        path: 'menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3'),
        name: 'Menu1-3',
        meta: { title: '获奖情况' }
      }
    ]
  }
  ]
},

{
  // 主题设置
  path: '/topical',
  name: 'topical',
  redirect: '/topical/index',
  component: Layout,
  meta: { title: '主题设置', icon: 'table' },
  children: [{
    path: 'festival',
    name: 'festival',
    component: () =>
			import('@/views/topical/index'),
    meta: { title: '节假日主题', icon: 'tree' }
  },
  {
    path: 'emigrated',
    name: 'emigrated',
    component: () =>
			import('@/views/topical/indexOne'),
    meta: { title: '闯关主题', icon: 'table' }
  }
  ]
},
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
