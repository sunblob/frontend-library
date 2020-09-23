import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

import network from './axios/axios';

Vue.prototype.$axios = network;

Vue.config.productionTip = false;

Vue.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 3,
    newestOnTop: false,
    position: 'bottom-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.7,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
});

Vue.use(require('vue-moment'));

Vue.prototype.$eventBus = new Vue();

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
