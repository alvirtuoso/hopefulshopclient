<template>

    <div>
        <button class="btn btn-danger" @click="handler">External Link</button>
<!-- 
  <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
    :fields="['name', 'email', 'birthdate']"></vuetable> -->


      </div>

</template>

<script>
// import Vuetable from 'vuetable-2/src/components/Vuetable'
export default{
    name: 'test',
//     components: {
//     Vuetable
//   },
    methods:{
        handler(){
            window.location = 'http://google.com'
        }       
    }
}

</script>

<style scoped>

</style>

