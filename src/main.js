import Vue from 'vue'
import App from './App.vue'
import Quasar, { Notify } from 'quasar'
import router from './router'
import store from './store'


Vue.config.productionTip = false

Vue.use(Quasar, {
  config: { Notify },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
