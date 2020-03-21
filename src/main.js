import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue';
import {
  Tab, Tabs, Swipe, SwipeItem, Collapse, CollapseItem, Popup,
} from 'vant';
import App from './App.vue';
import router from './router';
import '@/style/index.scss';

Vue.use(VueCompositionApi)
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Popup);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
