// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// import Antd from 'ant-design-vue';
import $ from 'jquery';
import { List, Button,Avatar,Empty } from 'ant-design-vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
// import echarts from 'echarts'
// import jsoneditor from 'jsoneditor'

// Vue.prototype.$jsoneditor = jsoneditor
// Vue.prototype.$echarts = echarts;
window.jQuery = window.$ = $;
Vue.use(ElementUI);
// Vue.use(Antd);
Vue.use(Button);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Empty);


Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


