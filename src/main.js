import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Popup } from 'vant';
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
// app.use(Swipe);
// app.use(SwipeItem);
app.use(Popup);
