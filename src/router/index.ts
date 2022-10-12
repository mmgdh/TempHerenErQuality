import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "QualityControl",
        component: () => import('../components/QualityControl/Index/Index.vue'),
        redirect: 'QualityControlIndex',
        children: [
            {
                path: "/QualityControlIndex",
                name: "QualityControlIndex",
                component: () => import('../components/QualityControl/Index/Index.vue'),
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})