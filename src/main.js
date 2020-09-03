import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router.js';
import ws from './mySocket.js';

Vue.prototype.WS = ws




Vue.config.productionTip = false;
Vue.use(Vant);


new Vue({
  render: h => h(App),
    router
}).$mount('#app');
