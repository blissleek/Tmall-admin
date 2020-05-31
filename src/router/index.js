import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'WebContainer',
      redirect: '/index',
      component: () => import('../components/front-layout/WebContainer'),
      children: [

        {
          path: '/cart',
          name: 'cart',
          meta: {},
          component: () => import('../views/web/cart'),
        },
        {
          path: '/order/confirm_order',
          name: 'confirm_order',
          meta: {},
          component: () => import('../views/web/order/confirm-order'),
        },
        {
          path: '/order/:id',
          name: 'user-order-detail',
          meta: {},
          component: () => import('../views/web/order/order-detail'),
        },
        {
          path: '/index',
          name: 'index',
          meta: {},
          component: () => import('../views/web/product'),
        },
        {
          path: '/personal',
          name: 'personal',
          meta: {},
          component: () => import('../views/web/user/personal'),
        },
        // {
        //   path: '/product',
        //   name: 'product',
        //   meta: {},
        //   component: () => import('../views/web/product'),
        // },
        {
          path: '/product/detail/:id',
          name: 'product-detail',
          meta: {},
          component: () => import('../views/web/product/detail'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {},
      component: () => import('../views/web/user/login'),
    },

    {
      path: '/admin',
      name: 'AdminContainer',
      redirect: '/admin/dashboard',
      component: () => import('../components/admin-layout/AdminContainer'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'dashboard',
          meta: {},
          component: () => import('../views/home'),
        },
        {
          path: '/admin/order',
          name: 'order',
          meta: {},
          component: () => import('../views/order'),
        },
        {
          path: '/admin/order/:id',
          name: 'order-detail',
          meta: {},
          component: () => import('../views/order/order-detail'),
        },
        {
          path: '/admin/user',
          name: 'user',
          meta: {},
          component: () => import('../views/user'),
        },
        {
          path: '/admin/product',
          name: 'product',
          meta: {},
          component: () => import('../views/product/product-table'),
        },
        {
          path: '/admin/product/addProduct',
          name: 'product-add',
          meta: {},
          component: () => import('../views/product/product-add'),
        },
        {
          path: '/admin/brand',
          name: 'brand',
          meta: {},
          component: () => import('../views/brand'),
        },
        {
          path: '/admin/carousel',
          name: 'carousel',
          meta: {},
          component: () => import('../views/carousel'),
        },
        {
          path: '/admin/category',
          name: 'category',
          meta: {},
          component: () => import('../views/category'),
        },

      ]
    }
  ]
})
