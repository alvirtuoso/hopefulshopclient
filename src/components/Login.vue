<template>

  <div class="container-fluid auth">
    <label id="msg" class="error"></label>
   <transition name="fade">
    <div v-show="authMessage" class="error">
       {{$store.state.authError}}
    </div>
   </transition>
   <div v-show="!show">
    <p>Let's create a new account !</p>
    <input class="auth-input" type="text" v-model="email" placeholder="Email"><br>
    <input class="auth-input" type="password" v-model="password" placeholder="Password"><br>
    <button class="btn btn-warning auth-button" v-on:click="signUp">Create</button>
    <a name="create"></a>
    <p class="auth-p"><a href="#" @click="toggleSignIn">Log in</a></p>
   </div>

  <transition name="fade">
   <div v-show="show">
    <h3>Sign In</h3>
    <input class="auth-input" type="text" v-model="email" placeholder="Email"><br>
    <input class="auth-input" type="password" v-model="password" @keyup.enter="signIn" placeholder="Password"><br>
    <button class="btn btn-warning auth-button" @click="signIn">Login</button>
    <p class="auth-p">
      <a href="#create" @click="toggleSignIn">Create an account</a><span class="divider"></span>
      <a href="#" @click="resetPassword">Reset Password</a>
    </p>
   </div>
  </transition>
  </div>

</template>

<script>
  import firebase from 'firebase'
  import UserSvc from '../services/UserSvc'
  import LogSvc from '../services/LogSvc'
  import { LOG_TYPE_ERROR, LOG_TYPE_INFO, LOG_TYPE_WARNING } from '../services/Constants'

  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: '',
        show: true,
        showLogin: true
      }
    },
    computed:{
      authMessage: function(){
        if(!this.$store.state.authError){
          return false
        }else return true
      }
    },
    methods: {
      toggleSignIn: function(){
          this.show = !this.show
          this.$store.dispatch('FindAuthError', '')
      },
      signIn: function() {
        this.$store.dispatch('FindAuthError', '')
        if(!this.email)
          this.$store.dispatch('FindAuthError', 'Email is required')
        else{
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              // Load user from database AND store user state
              //>>> ****** Do this in helpers/firebaseConfig.js onAuthStateChanged event listener **** <<<

              this.$router.push('dash')
            },
            (err) => {
              // this.$store.commit('SetUser', false)
              LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": err.message, "UserEmail": this.email})
              this.$store.dispatch('FindAuthError', err.message)
            }
          )
        }
      },
      signUp: function() {
        this.$store.dispatch('FindAuthError', '')
        if(!this.email)
          this.$store.dispatch('FindAuthError', 'Email is required')
        else{
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              UserSvc.addUser({"email": user.email, "phone": user.phoneNumber}).then(
                resp => { 
                    if(resp && resp.data){
                      this.$store.dispatch('SetCurrentUser', {"email": user.email, "userId": resp.data.id})
                    } 
                  }
              )
              this.$store.dispatch('FindAuthError', 'Account was created successfully.')

              this.show = !this.show
              LogSvc.addLog({"LogType": LOG_TYPE_INFO, "Note": "Login.vue signUp()", "UserEmail": this.email})
            },
            (err) => {
              this.$store.dispatch('FindAuthError', err.message)
              LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": err.message, "UserEmail": this.email})
            }
          )
        }
      },
      logOut: function(){
        firebase.auth().signOut()
        // store user state. *** DO this in helpers/firebaseConfig.js event listner onAuthStateChanged()
      },
      resetPassword: function(){
        this.$store.dispatch('FindAuthError', '')
        document.getElementById("msg").innerText = ''
        if(!this.email){
          this.$store.dispatch('FindAuthError', 'Email is required')
        }else{
          firebase.auth().sendPasswordResetEmail(this.email).then(function() {
            // Email sent.
            // Somehow only pure js works. vue related code like variables, store, etc don't work
            document.getElementById("msg").innerText = 'Check your email for password reset link'
            LogSvc.addLog({"LogType": LOG_TYPE_INFO, "Note": "Login.vue resetPassword()", "UserEmail": this.email})
          }).catch(function(error) {
              // An error happened.
              LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": "Login.vue resetPassword()", "UserEmail": this.email})
              document.getElementById("msg").innerText = 'error.message'
          })

        }
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */

  p a {
    text-decoration: underline;
    cursor: pointer;
  }

 .fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.error{
  color:darkred;
}

.divider {
    border-left: 1.35px solid #5f656d; /* Border on the left */
    width: 1px; /* Width instead of height */
    height: 100%;
    padding-left: 5px;
    margin-left: 6px;
}
</style>