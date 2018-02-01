<template>
  <div class="container-fluid auth">
    <p>Let's create a new account !</p>
    <input class="auth-input" type="text" v-model="email" placeholder="Email"><br>
    <input class="auth-input" type="password" v-model="password" placeholder="Password"><br>
    <button class="btn btn-warning auth-button" v-on:click="signUp">Sign Up</button>
    <span><router-link to="/login">Back to login</router-link></span>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
              
              
            this.$router.push('login')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>
  span {
    display: block;
    margin-top: 20px;
  }
</style>