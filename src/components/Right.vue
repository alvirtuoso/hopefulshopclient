<template>
    <div class="col-md-4 pad-40">
        <div class="card">
         
          <ul class="list-group list-group-flush">
            <li class="list-group-item pad-2" v-for="(item, index) in itemList">
              <div class="row curso" @click="onSelectedItem(item)">
                <div class="col-5">
                  <img class="img-fluid" :src= "item.urlMediumImage" alt="Image Not Available">
                </div>
                <div class="col-7">
                  <h6 class="price">{{item.title}}</h6>
                      <price :item="item"></price>
                      <ave-review :item="item" ref="review"></ave-review>
                    <p v-if="item.isPrimeEligible" class="font-italic font-weight-bold prime">Prime Eligible</p>
                </div>
              </div>
            </li>
          </ul>
         
        </div>
         <div v-if="itemList.length > 1" class="row justify-content-center">
            <!-- amazon api only returns 10 items per search and up to 5pages, so that's 50 total -->
          <b-pagination size="md" v-on:input="pageChanged" :total-rows="50" v-model="currentPage" :per-page="10">
          </b-pagination>
      </div>
    </div>
</template>

<script> 
// <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
// import AmazonSvc from '../services/AmazonSvc';
import Mixin from '../helpers/mixin.js';
// import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: 'right',
    mixins: [Mixin],
    computed:{
      itemList: function(){
        return this.$store.state.itemList 
      }
      
    },
    data(){
      return{ currentPage: this.$store.state.currentPage }
    },
    updated(){
      this.currentPage = this.$store.state.currentPage
    },
    methods:{
      onSelectedItem: function(item){
        this.scrollToTop(1000);
        this.$store.dispatch('FetchItem', {asin: item.asin, country: this.$store.state.country})
      },
      pageChanged: function() {
        this.$store.dispatch('FetchData', {keyword: this.$store.state.keyword, page: this.currentPage, country: this.$store.state.country})
        this.$store.dispatch('SetActivePage', this.currentPage)
        this.scrollToTop(1000);
      },
      // ,
      // onInfinite: function(){
      //   setTimeout(() => {
      //     const temp = [];
      //     let page = this.$store.state.currentPage + 1;
      //     console.log('rvue', page)
      //     this.$store.dispatch('FetchData', {keyword: this.$store.state.keyword, page: page})
      //     // for (let i = this.itemList.length + 1; i <= this.itemList.length + 10; i++) {
      //     //   temp.push(i);
      //     // }
      //     this.itemList = this.itemList.concat(this.$store.state.itemList);
      //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      //   }, 1000);        
      // }
    }
  }
</script>
<style scoped>
  .price-label{
    color:#900;
    font-weight:bold;
  }
    .padding-5l{
      padding-left: 1em;
    }
    .stars{
      padding-left: 1em;
    }
    .curso{
       cursor:pointer;
    }
    .curso:hover{
      color:#167ac6;
    }
    .prime{
      color: #167ac6;
    }
    .pad-2{
      padding:2px;
    }
    .pad-40{
      padding-right:40px;
      padding-left:1px;
    }
</style>