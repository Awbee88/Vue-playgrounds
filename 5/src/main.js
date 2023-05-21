import { createApp } from "vue";
import App from './App';

import { createVfm } from 'vue-final-modal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle);
library.add(faExclamationCircle);

const vfm = createVfm();

createApp(App).use(vfm).component('fa-icon', FontAwesomeIcon).mount('#app');

import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import 'vue-final-modal/style.css'
