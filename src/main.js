import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Notifications from 'vue-notification'
import { auth } from "@/firebase";
import VueChatScroll from 'vue-chat-scroll'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import "vue-snotify/styles/material.css";



Vue.use(VueChatScroll)
Vue.use(Notifications)

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, options)

Vue.config.productionTip = false

auth.onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch('setUsuario', user);  
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});



