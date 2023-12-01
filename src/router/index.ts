import routeSettings from '@/config/route'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { flatMultiLevelRoutes } from './helper'


const Layouts = () => import("@/layouts/index.vue")


/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redict/index.vue')
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export  const asyncRoutes: RouteRecordRaw[] = []
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

// 重置路由
export function resetRouter() {
  // try {
  //   router.getRoutes().forEach((route) => {
  //     const { name, meta } = route
  //     if (name && name.roles?.length) {
  //       router.hasRoute(name) && router.removeRoute(name)
  //     }
  //   })
  // } catch {
  //   window.location.reload()
  // }
}


export default router
