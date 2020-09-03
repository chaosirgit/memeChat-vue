import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    base: '/', //根目录
    routes:[
        {
            path: '/login',
            component: () => import('./views/login/index')
        },
        {
            path: '/register',
            component: () => import('./views/register/index')
        },
        {
          path: '/',
          redirect: '/main',
            component: () => import('./App.vue')
        },
        {
            path: '/main',
            component: () => import('./views/index/index')
        },
        {
            path: '/user',
            component: () => import('./views/user/index')
        },
        {
            path: '/question',
            component: () => import('./views/question/index')
        },
        {
            path: '/myQuestion',
            component: () => import('./views/myQuestion/index')
        },
        {
            path: '/chat',
            component: () => import('./views/chat/index')
        }
    ]
})