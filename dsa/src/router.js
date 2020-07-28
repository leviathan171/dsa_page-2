import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/layout/Home.vue'
// 智能分析
import analysis from './components/analysis/index.vue'
// 設備管理
import machine from './components/machine/index.vue'
// 故障管理
import malfunction from './components/break/index.vue'
// 生產管理
import PowerAnalysis from './components/manufacture/index.vue'
import FailureAnalysis from './components/manufacture/failure_analysis/index.vue'
// 生產管理下 報價系統/機台分析
import Cadata from './components/manufacture/報價管理系統/index.vue'
import toolana from './components/manufacture/機台分析/index.vue'

// 刀具管理 - 刀具資訊、刀具追蹤、訂單管理
import ToolInfo from './components/tool/index.vue'
import ToolTrack from './components/tool/track/index.vue'
import OrderManagement from './components/tool/order/index.vue'
// 系統狀態
import System from './components/SystemIndex/index.vue'
//水位分析
import waterlevel from './components/waterlevel/index.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            redirect: '/System',
            component: Home,
            children: [{
                    path: '/System',
                    name: 'System',
                    component: System
                },
                {
                    path: '/machine',
                    name: 'machine',
                    component: machine
                },
                {
                    path: '/analysis',
                    name: 'analysis',
                    component: analysis
                },
                // {
                    // path: '/manufacture',
                    // name: 'Cadata',
                    // component: Cadata,
                // },
				{
					path: '/manufacture',
					name: 'PowerAnalysis',
					component: PowerAnalysis,
				},
				{
					path: '/FailureAnalysis',
					name: 'FailureAnalysis',
					component: FailureAnalysis,
				},
                {
                    path: '/toolana',
                    name: 'toolana',
                    component: toolana,
                },
                {
                    path: '/malfunction',
                    name: 'malfunction',
                    component: malfunction
                },
                {
                    path: '/toolinfo',
                    name: 'toolinfo',
                    component: ToolInfo
                },
				{
                    path: '/tooltrack',
                    name: 'tooltrack',
                    component: ToolTrack
                },
                {
                    path: '/waterlevel',
                    name: 'waterlevel',
                    component: waterlevel
                },
                {
                    path: '/ordermanagement',
                    name: 'ordermanagement',
                    component: OrderManagement
                },
            ]

        }

    ]
})
