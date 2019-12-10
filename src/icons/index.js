import SvgIcon from '@/components/SvgIcon.vue'

//全局注册
Vue.component('svg-icon',SvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)