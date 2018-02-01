// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// **** Vue ecosystem library
// import 'es6-promise/auto'

import Vue from 'vue';
import VueRx from 'vue-rx';
import Vuex from 'vuex'
import VuexStore from './services/store'
// import Router from 'vue-router';
import router from './router'

import App from './App';

// **** Third party libraries ****
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'amazon-autocomplete/dist/amazon-autocomplete.min.js'

import firebase from 'firebase'
// import { fireInit } from './helpers/firebaseConfig'

import {fromPromise} from 'rxjs/observable/fromPromise';
import {from} from 'rxjs/observable/from';
import VueLazyload from 'vue-lazyload';
import VueLocalStorage from 'vue-localstorage';

// **** CUSTOM COMPONENTS *****
import Test from './components/Test';
import ContactForm from './components/ContactForm';
import AddToCart from './components/AddToCart'
import CartItems from './components/CartItems'
import CardList from './components/CardList';
import AveReview from './components/AveReview';
import ItemDetail from './components/ItemDetail'
import Bottom from './components/Bottom'
import Left from './components/Left'
import Right from './components/Right'
import Middle from './components/Middle'
import Price from './components/Price'
import ItemTabs from './components/ItemTabs'
import GridView from './components/GridView'
// import Ellipsis from './components/Ellipsis'
import About from './components/About'
import Landing from './components/Landing'
import Privacy from './components/PrivacyPolicy'
import Dashboard from './components/Dashboard'

// **** THIRD PARTY COMPONENTS *******
import Icon from 'vue-awesome/components/Icon'
import ProgressiveImage from 'progressive-image/dist/vue'
import VueProgressiveImage from 'vue-progressive-image'
import StarRating from 'vue-star-rating'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Vuelidate from 'vuelidate'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import ClickConfirm from 'click-confirm/src/ClickConfirm.vue'

import { fireInit } from './helpers/firebaseConfig'

// **** FONT-AWESOME icons ******
import 'vue-awesome/icons/shopping-cart'
import 'vue-awesome/icons/power-off'
import 'vue-awesome/icons/dashboard'
import 'vue-awesome/icons/facebook-square'
import 'vue-awesome/icons/google-plus-square'
import 'vue-awesome/icons/pinterest-square'
import 'vue-awesome/icons/twitter-square'
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/star-half'
import 'vue-awesome/icons/th-large'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/backward'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/refresh'
import 'vue-awesome/icons/gear'

var SocialSharing = require('vue-social-sharing');

Vue.config.productionTip = false;

// *** THIRD PARTY COMPONENT REGISTRATION
Vue.component('star-rating', StarRating);
Vue.component('pulse-loader', PulseLoader);
Vue.component('clickConfirm', ClickConfirm);

Vue.use(VueLocalStorage);
Vue.use(Vuex)
Vue.use(VueRx);
Vue.use(BootstrapVue);
Vue.use(SocialSharing);
Vue.use(VueProgressiveImage)
Vue.use(Vuelidate);
// Vue.use(VueTabs)
Vue.use(ProgressiveImage, {
  removePreview: false
});
// var toastrConfigs = {
//     position: 'top right',
//     showDuration: 4000
// }
Vue.use(CxltToastr)//, toastrConfigs)

// *** CUSTOM COMPONENT REGISTRATION
Vue.component('app', App);
Vue.component('bottom', Bottom)      
Vue.component('card-list', CardList ); // register component globally
Vue.component('left', Left);
Vue.component('right', Right);
Vue.component('middle', Middle);
Vue.component('ave-review', AveReview);
Vue.component('icon', Icon);
Vue.component('item-detail', ItemDetail);
Vue.component('price', Price);
Vue.component('item-tabs', ItemTabs);
Vue.component('grid-view', GridView);
// Vue.component('ellipsis', Ellipsis);
Vue.component('add-to-cart', AddToCart);
Vue.component('cart-items', CartItems);
Vue.component('about', About);
Vue.component('contact', ContactForm);
Vue.component('landing', Landing);
Vue.component('privacy', Privacy);
Vue.component('dash', Dashboard);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:  require('./assets/no_image_available.jpg'),
  loading: require('./assets/loading.gif'),//'http://via.placeholder.com/350x150',
  attempt: 1,
  lazyComponent: true,

});

export const store = new Vuex.Store(VuexStore);
export const localStorage = VueLocalStorage;

fireInit()

/* eslint-disable no-new */
new Vue({
  router,
  store,
  localStorage: {
    someNumber: {
      type: Number,
    },
    searchedWords: '',
  },
  mounted(){
    // store.commit('increment')

// console.log('store here:', store.state.count) // -> 1
  },
  components: { App }

}).$mount('#app')
