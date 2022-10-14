import { Components } from 'ant-design-vue/lib/date-picker/generatePicker'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const BaseQualityUrl = '../components/QualityControl'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "QualityControl",
        component: () => import('../components/QualityControl/Index/Index.vue'),
    },
    {
        path: "/Medical",
        name: "MedicalQualityControl",
        component: () => import('../components/QualityControl/Medical/Index.vue'),
        children: [
            {
                path: "/ErWorkload",
                name: "ErWorkload",
                component: () => import('../components/QualityControl/Medical/ErWorkload/ErWorkload.vue'),
                children: [
                    {
                        path: "/MouthCount",
                        name: "MouthCount",
                        component: () => import('../components/QualityControl/Medical/ErWorkload/MouthCount.vue')
                    }
                ]
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})