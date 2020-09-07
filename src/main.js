import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

/**
 * 表单验证插件：https://aweiu.com/documents/element-ui-verify/
 */
import elementUIVerify from 'element-ui-verify'
import { regVerifyRule, elementUIVerifyErrorMessageTemplate } from '@/utils/elementUIVerifyRule'
Vue.use(elementUIVerify, {
  errorMessageTemplate: elementUIVerifyErrorMessageTemplate
})
// 注册验证规则
regVerifyRule(elementUIVerify)
// ./结束表单验证插件的注册-----------------------------

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
