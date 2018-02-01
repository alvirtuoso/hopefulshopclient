<template>
<div>
  <div class="content">
    <div class="bg-faded" >
      <b-navbar toggleable type="inverse">

          <b-nav-toggle target="nav_collapse"></b-nav-toggle>

          <b-link class="navbar-brand" to="/">
            <img src="./assets/logo.png" class="d-inline-block align-top pr-5" alt="logo">
          </b-link>

          <b-collapse is-nav id="nav_collapse">

            <b-nav is-nav-bar class="w-50">

                  <div class="input-group w-100">
                      <input id="search-input" @keyup.enter="search"  type="text" ref="search" class="form-control" v-model="keyword" placeholder="Start shopping">
                      <span class="input-group-btn">
                      <button class="btn btn-outline-warning" v-on:click="search" type="button">
                        <icon name="search" color="#f0ad4e" cursor="pointer" scale="1"></icon>
                      </button>
                    </span>
                  </div>
            </b-nav>

            <b-nav is-nav-bar class="ml-auto">
              <b-link class="nav-link" to="cart">
                <icon name="shopping-cart" color="#f0ad4e" cursor="pointer" scale="1.75"></icon>{{$store.state.cartItems.length}}
              </b-link>
              <b-link class="nav-link" to="dash">
                <icon name="gear" color="#f0ad4e" cursor="pointer" scale="1.75"></icon>
              </b-link>              
              <!-- <button v-show="isSignedIn" class="btn ml-3" @click="signOut"><icon name="power-off" color="#E65100" cursor="pointer" scale="1.75"></icon></button>
              <button v-show="!isSignedIn" class="btn btn-outline-warning p-1 mt-2 mb-2 btn-sm" @click="signIn">Login</button> -->
            </b-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div class="row pt-3 pl-4 pr-2">
          <router-view></router-view>

      </div>

      <div class="row">
          <div v-if="$store.state.loading" class="loading">
            <pulse-loader color="#757575" size="18px"></pulse-loader>
          </div>
        <!-- <br />
        <div class="mx-auto">
          <b-alert :show="duration" dismissible variant="warning" @dismiss-count-down="countDownChanged">
            {{$store.state.error}}
          </b-alert>

        </div> -->
        <div v-if="hasMessage"></div> <!-- Workaround to execute the show Message reactive to $store.state.error -->
      </div>

  </div>
  <contact></contact>
  <footer id="test21" class="container-fluid badge-default">
              <p class="text-center">
                <span class="small text-white">
               Note: We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.
                </span>
              </p>
              <p class="text-center">
                <span class="small">
                  <ul class="list-inline">
                    <li class="list-inline-item"><router-link to="about" class="link-white">About | </router-link></li>
                    <li class="list-inline-item"><router-link to="privacy" class="link-white">Privacy Policy | </router-link></li>
                    <!-- <li class="list-inline-item"><a href="mailto:wedneer@yahoo.com" class="link-white">Email Us</a></li> -->
                    <li class="list-inline-item">
                      <!-- <b-btn v-b-modal.contact :variant="success">contact</b-btn> -->
                      <b-button v-b-modal.contact variant="link" style="color:#fff" size="sm">Contact</b-button>
                    </li>
                  </ul>
                </span>
              </p>
    </footer>
</div>
</template>

<script>
//  @keyup.enter="search"
import Mixin from './helpers/mixin.js'
import { mapActions } from 'vuex'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'
import firebase from 'firebase'
import DnsSvc from './services/DnsService'
import { AMAZON_DEFAULT_ID } from './services/Constants'

// import service from './services/AmazonSvc'
// import jQuery from 'jquery'
// global.jQuery = jQuery
// global.jquery = jQuery // jquery lowercase was the solution for me
// global.$ = jQuery
// import VueNotifications from 'vue-notifications'
export default {
  name: 'app',
  mixins: [Mixin],
  // computed: mapState([
  //   'itemList'
  // ]),
  props:{
    items:[]
  },
  // // to and from ->object{name: undefined, meta: Object, path: "/", hash: "", query: Object…}
  //   beforeRouteUpdate (to, from, next) {
  //   // react to route changes...

  //    next()
  // },
  data: function(){
    return{
      // itemList: this.$store.state.itemList,
      // searchList: this.$store.state.keywordList, // used to hold search keywords for the "search history" feature
      keyword: '',
      searchInput: null,
      searchTop: null,
      isLoading: false,
      dismissCountDown: null
    }
  },
  computed: {
    loading: function(){
      if(this.$store.state.loading){
        this.isLoading = this.$store.state.loading
      }else{
        this.isLoading = false
      }
      return this.isLoading
    },
    isSignedIn: function(){
      let currentUser = firebase.auth().currentUser
      if(!currentUser){
        return false
      }
      else
        return true
    },
    viewedItems: function(){
      console.log(this.$store.state.selectedItems)
      return this.$store.state.selectedItems;
    },
    hasMessage: function(){
      // computed always is reactive to $store.state changes unlike the data method
        if(this.$store.state.error != '' && !this.isLoading){
          this.showMessage(this.$store.state.error)
          return true; // seconds
        }else if(this.$store.state.authError && !this.isLoading)
        {
          this.showMessage(this.$store.state.authError)
          return true;
        }else {
          return false;
        }
    },
    country: function(){
      return this.$store.state.country
    },
    isHome: function(){
      var a = false;
      if((this.$store.state.itemList && this.$store.state.itemList.length > 0)
      || (this.$store.state.keywordList && this.$store.state.keywordList.length > 0)){
          a = true
      }
      return a
    }
  },
  beforeCreate () {
    // firebase.auth().onAuthStateChanged((user) => {
    //   // initially user = null, after auth it will be either <fb_user> or false
    //   this.$store.commit('SetUser', user || false);
    // });
  },
  created(){
    this.$store.dispatch('DetectCountry')

  },
  mounted(){
    // Auto suggest on search
    this.searchInput = new AmazonAutocomplete('#search-input');
    this.searchInput.onSelectedWord(word => {this.keyword = word; this.search()});

    this.SetAmazonAssociateId();
    // Local storage for searched words
    var s = this.$localStorage.get('searchedWords')
    var searchedWords = JSON.parse(s)

    if(searchedWords){
      this.$store.dispatch('SetKeywordsWithArray', searchedWords)
    }
  },
  methods: {

   search: function(event){
     // Clear error first
      // this.$store.dispatch('ClearError');
      var keysearch = this.removeSpecialChars(this.keyword)
      var id = this.$localStorage.get('associateId')
      this.searchInput._input.nextElementSibling.style.display = 'none'
      this.$store.dispatch('SetLoadingFlag', true)
      this.$store.dispatch('FetchData', {keyword: keysearch, page: 1, country: this.$store.state.country}); // searched keyword is saved here also

      this.$router.push('search')
    },
    signOut: function(){
      if(this.isSignedIn){
        firebase.auth().signOut()
      }
      this.$router.push('/')
    },
    signIn: function(){
      if(!this.isSignedIn)
        this.$router.push('login')
      else 
        this.$router.push('dash')
    },
    showMessage(msg) {
           // Show notification
          this.$toast.success({
              title:'',
              message: msg,
              position: 'top-right',
              timeOut: '4000',
              showMethod: 'fadeIn'
          })

    },
    countDownChanged(dismissCountDown) {
        // this.dismissCountDown = dismissCountDown;// comment this out . just test only
      },
    SetAmazonAssociateId(){
      var amzID = null
      if(this.$route.params.id){
        if(this.isAmazonId(this.$route.params.id)){
          this.$localStorage.set('associateId', this.$route.params.id)
        }
        else{
          // Get the amazon associate id from the database. This is setup by the user from Dashboard page (gear icon)
          DnsSvc.getDnsByUrlSubname(this.$route.params.id).then(resp => {
            // Local storage for amazon associateId
            this.$localStorage.set('associateId', resp.data.amazonId);
          })
        }
      }else{
        this.$localStorage.set('associateId', AMAZON_DEFAULT_ID);
      }      
    }  
  }
}

</script>

<style lang="scss">
body {
  position: relative;
  margin: 0;
}

.content {
  min-height: calc(100vh - 50px);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
.full-height{
  height: 100vh;
}
.bg-gray{
  background-color: #fafafa;
}
.link-white{
  color:#fff;
}
a:hover{
  color: #fff;
  
}
.amz-orange{
  color: #f0ad4e;
}
.bg-orange {
    background-color: #f0ad4e !important;
    text-align: center;
    color: #fff;
}
.navbar-inverse .navbar-nav .nav-link{
  color: inherit !important;
}
/**  Auth/Login  ****/
  .auth {
    margin-top: 40px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 40px;
    width: 50%;
  }
  .auth-input {
    margin: 10px 0;
    width: 50%;
  }
  .auth-button {
    cursor: pointer;
  }
  .auth-p {
    margin-top: 40px;
    font-size: 15px;
  }
/**  Auth/Login ends ****/

.badge-notify{
   background:red;
   position:relative;
   top: -20px;
   left: -35px;
  }
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 100px;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.note-header{
    padding-left: 1px !important;
    margin-left: 2px !important;
    margin-right: 2px !important;
    font-size: .9rem;
    border-bottom-style: solid;
    border-bottom-width: thin;
    border-bottom-color: #bababa;
}
/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(0,0,0,0.1);*/
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;

}
/* Words container */
.ac__inner{
    background: #fafafa;
    padding-top: 50px;
}
.ac__container{
  z-index:1;
}

/* Individual word element */
.ac__word{
    margin: 0;
    padding: 5px;
}

/* Word prefix style. It’s the span containing the
search keyword within the word. */
.ac__prefix{
    font-weight: bold;
}

/* Style applied to each words while navigating through
the list or on hover */
.ac__word--selected, .ac__word:hover{
    background-color: #e3e3e3;
}

.add-to-cart, .like {
  background: #ff9f1a;
  margin-bottom:.5em;
  border: none;
  font-size: 13px !important;
  // text-transform: UPPERCASE;
  // min-height: 50px;
  // max-width: 110px;
  padding: 3px;
  color: #000 !important;
  -webkit-transition: background .3s ease;
          transition: background .3s ease; }
  .add-to-cart:hover, .like:hover {
    background: #b36800;
    cursor: pointer;
    color: #fff !important; }
</style>

