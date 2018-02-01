<template>
<div class="container-fluid">
  <cart-items v-if="$store.state.cartItems.length > 0 && $router.currentRoute.path == '/cart'"></cart-items> 
  <div class="row">
    <left></left>   
    <div class="col-9 bootstrap snippets">
        <div v-if="noSearchResult">
          <p> Your search <span class="searched-keyword">"{{this.$store.state.keyword}}"</span>  did not match any products.</p>
          <p class="no-result"> Try something like </p>
          <ul>
            <li>Using more general terms</li>
            <li>Checking your spelling</li>
          </ul>
        </div>

        <!-- ******************** List View Icons ******************* -->
        <div v-if="itemList.length > 0" class="row note-header">

            <div class="col-md-4">1-{{itemList.length}} results for <span class="searched-keyword">"{{this.$store.state.keyword}}"</span></div>
            <div class="col-md-4 offset-md-4 text-right">
                <span class="mr-2" @click="isActive = !isActive"><icon name="bars" :color="viewColor.listView" cursor="pointer" scale="1.5"></icon></span>
                <span @click="isActive = !isActive"><icon name="th-large" :color="viewColor.gridView" cursor="pointer" scale="1.5"></icon></span>
            </div>

        </div>
       <!--  ***************** end of List View icons  ******************* -->

        <!-- **************** 'Grid' view ******************************** -->
        <lazy-component @show="handler">
            <grid-view :items="$store.state.itemList" v-show="view.grid"></grid-view>
        </lazy-component>

        <!-- **************** end of Grid View *************************** -->

        <!-- **** 'List' view **** -->
        <!-- Do not show item with empty OfferListingId, which is required for adding item to cart & also means it has price. An itme price will show NA -->
        <div v-show="view.list"  v-for="(item, index) in itemList"  v-bind:key="item.id" class="product-content product-wrap clearfix">
            <div class="row">
                <div class="col-md-5 col-sm-12 col-xs-12">
                <div @click="onViewItemDetail(item)" class="product-image curso"> 
                  <!-- <img :src= "item.urlLargeImage" alt="No Image Available" class="img-responsive mx-auto d-block list-img">  
                    <progressive-img :src="item.urlLargeImage" /> 840dd6e
                   <img class="preview" v-progressive="'/static/img/cube.840dd6e.gif'" :src="item.urlLargeImage"/> -->
                  <img class="img-fluid" v-lazy="item.urlLargeImage">
                </div>
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12">
                <div class="product-deatil">
                    <ul class="curso">
                      <li @click="onViewItemDetail(item)">
                       <h6 class="name"> {{item.title}} </h6>
                      </li>
               
                    </ul>
                </div>
                <div class="product-info smart-form">
                  <div class="row">

                      <p class="description">
                        <price :item="item"></price>
                        <ave-review :item="item" ref="review"></ave-review>
                        <span v-if="item.isPrimeEligible" class="font-italic font-weight-bold prime">
                          Prime Eligible
                        </span>
                      </p>
                  </div>
                  <div class="row">
                      <div class="col-md-6 col-sm-6 col-xs-6"> 
                         <add-to-cart :item="item"></add-to-cart>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="rating">

                            <social-sharing :url="item.urlItemLink" inline-template>
                            <div>
                                <network network="facebook">
                                    <icon name="facebook-square" color="#3B5998" cursor="pointer" scale="2"></icon>
                                </network>
                                <network network="googleplus">
                                <icon name="google-plus-square" color="#DD4B39" cursor="pointer" scale="2"></icon>
                                </network>
                                <network network="pinterest">
                                <icon name="pinterest-square" color="#CC2127" cursor="pointer" scale="2"></icon>
                                </network>
                                <network network="twitter">
                                <icon name="twitter-square" color="#55ACEE" cursor="pointer" scale="2"></icon>
                                </network>
                            </div>
                            </social-sharing>

                        </div>
                      </div>
                  </div>

                </div>
              </div>
            </div>
        </div>
       <!-- ************* ENd of List view ************** -->

    </div>
  </div> 

  <div v-if="itemList.length > 1" class="row justify-content-center">
   <!-- amazon api only returns 10 items per search and up to 5pages, so that's 50 total -->
      <b-pagination size="md" v-on:input="pageChanged" :total-rows="50" v-model="currentPage" :per-page="10">
      </b-pagination>
  </div>
 <div class="row mb-5">

 </div>

</div>
</template>

<script> 
// This component lists the search results.
import Mixin from '../helpers/mixin.js'

export default {
  name: 'middle',
  // components: {
  //   InfiniteLoading,
  // },
  mixins:[Mixin],
  data () {
    return {
      currentPage: this.$store.state.currentPage,
      itemIndex: 0,
      noSearchResult: false,
      isActive: true,
    //   isLoading: false
    }
  },
  mounted(){
    this.hasSearchResult = false;
    if(this.itemList.length > 0){
        this.noSearchResult = true;
    }
  },
  computed:{
    itemList: function(){
            //   console.log("lowestprice", this.$store.state.itemList[0])
      return this.$store.state.itemList
    },
    aveStars: function(){
      return '0'
    },
    viewColor: function(){
        var c = {listView: '#f0ad4e', gridView: '#757575'}
        if(this.isActive){
            c.listView = '#f0ad4e'
            c.gridView = '#757575'
        }
        else
        {
            c.listView = '#757575'
            c.gridView = '#f0ad4e'
        }
        return c
    },
    view: function(){
        var view = {grid: false, list: true}
        if(this.isActive){
            view.grid = false
            view.list = true
        }else{
            view.grid = true
            view.list = false
        }
        return view
    }
  },
  updated(){
    this.currentPage = this.$store.state.currentPage
    if(this.itemList.length > 0){
        this.noSearchResult = false;
    }else this.noSearchResult = true;
  },
  methods: {
      pageChanged: function() {
        this.$store.dispatch('SetLoadingFlag', true)
        this.$store.dispatch('FetchData', {keyword: this.$store.state.keyword, page: this.currentPage, country: this.$store.state.country})
        this.$store.dispatch('SetActivePage', this.currentPage)
        this.scrollToTop(1000);
      },
      onViewItemDetail: function(item){
          if(item.offerListingId.length == 0){
            window.location.href = item.urlItemLink
          }
          else{
            this.$store.dispatch('SetLoadingFlag', true)
           this.$store.dispatch('FetchItem', {asin: item.asin, country: this.$store.state.country})
          }
          
      },
      handler(){ 
        // Do something on lazy loading
     }
    //   onViewClicked: function(){
    //       // Toggles color for the view buttons
    //       this.isActive = !this.isActive

    //       // 
    //   }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

.resize{
    height: 30px;
    padding: 5px 15px;
}
.no-result{
  font-weight: 700!important;
      font-size: 13px!important;
    line-height: 19px!important;
}
.searched-keyword{
    font-weight: 700;
      font-size: 15px;
}
.prime{
  color: #167ac6;
  font-size: 15px;
}
.list-img{
  max-height: 300px;
  max-width: 320px;
}
.grid-img{
    max-height: 200px;
    max-width: 200px;
}
.orange-color{
  background-color:#FFCA28;
  color:#000;
}
.onhover:hover{
    border-width: 6px;
    border-color: #ffcc66;
    border-style: solid;
    cursor:pointer;
}
.curso{
  cursor:pointer;
  list-style-type:none;
}
.curso:hover{
    text-decoration:underline;
    color:#ff9f1a;
  }


.product-content {
    border: 2px solid #dfe5e9;
    margin-bottom: 20px;
    margin-top: 12px;
    background: #fff;
    padding: 4px;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
}

.product-content .carousel-control.left {
    margin-left: 0
}

.product-content .product-image {
    display: block;
    min-height: 238px;
    overflow: hidden;
    position: relative
}

.product-content .product-deatil {
    border-bottom: 1px solid #dfe5e9;
    padding-bottom: 17px;
    padding-left: 16px;
    padding-top: 16px;
    position: relative;
    background: #fff
}

.product-content .product-deatil h5 a {
    color: #2f383d;
    font-size: 15px;
    line-height: 19px;
    text-decoration: none;
    padding-left: 0;
    margin-left: 0
}

.product-content .product-deatil h5 a span {
    color: #9aa7af;
    display: block;
    font-size: 13px
}

.product-content .product-deatil span.tag1 {
    border-radius: 50%;
    color: #fff;
    font-size: 15px;
    height: 50px;
    padding: 13px 0;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 50px
}

.product-content .product-deatil span.sale {
    background-color: #21c2f8
}

.product-content .product-deatil span.discount {
    background-color: #71e134
}

.product-content .product-deatil span.hot {
    background-color: #fa9442
}

.product-content .description {
    font-size: 12.5px;
    line-height: 20px;
    padding: 10px 14px 16px 19px;
    background: #fff
}

.product-content .product-info {
    padding: 11px 19px 10px 20px
}

.product-content .product-info a.add-to-cart {
    color: #2f383d;
    font-size: 13px;
    padding-left: 16px
}

.product-content name.a {
    padding: 5px 10px;
    margin-left: 16px
}

.product-info.smart-form .btn {
    padding: 6px 12px;
    margin-left: 12px;
    margin-top: -10px
}

.product-entry .product-deatil {
    border-bottom: 1px solid #dfe5e9;
    padding-bottom: 17px;
    padding-left: 16px;
    padding-top: 16px;
    position: relative
}

.product-entry .product-deatil h5 a {
    color: #2f383d;
    font-size: 15px;
    line-height: 19px;
    text-decoration: none
}

.product-entry .product-deatil h5 a span {
    color: #9aa7af;
    display: block;
    font-size: 13px
}

.load-more-btn {
    background-color: #21c2f8;
    border-bottom: 2px solid #037ca5;
    border-radius: 2px;
    border-top: 2px solid #0cf;
    margin-top: 20px;
    padding: 9px 0;
    width: 100%
}

.product-block .product-deatil p.price-container span,
.product-content .product-deatil p.price-container span,
.product-entry .product-deatil p.price-container span,
.shipping table tbody tr td p.price-container span,
.shopping-items table tbody tr td p.price-container span {
    color: #21c2f8;
    font-family: Lato, sans-serif;
    font-size: 24px;
    line-height: 20px
}

.product-info.smart-form .rating label {
    margin-top: 0
}

.product-wrap .product-image span.tag2 {
    position: absolute;
    top: 10px;
    right: 10px;
    text-align: center;
    color:#900;
    font-weight:bold;
}

.product-wrap .product-image span.sale {
    background-color: #57889c
}

.product-wrap .product-image span.hot {
    background-color: #a90329
}

.shop-btn {
    position: relative
}

.shop-btn>span {
    background: #a90329;
    display: inline-block;
    font-size: 10px;
    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1), inset 0 -1px 0 rgba(0, 0, 0, .07);
    font-weight: 700;
    border-radius: 50%;
    padding: 2px 4px 3px!important;
    text-align: center;
    line-height: normal;
    width: 19px;
    top: -7px;
    left: -7px
}

.description-tabs {
    padding: 30px 0 5px!important
}

.description-tabs .tab-content {
    padding: 10px 0
}

.product-deatil {
    padding: 30px 30px 50px
}

.product-deatil hr+.description-tabs {
    padding: 0 0 5px!important
}

.product-deatil .carousel-control.left,
.product-deatil .carousel-control.right {
    background: none!important
}

.product-deatil .glyphicon {
    color: #3276b1
}

.product-deatil .product-image {
    border-right: 0px solid #fff !important
}

.product-deatil .name {
    margin-top: 0;
    margin-bottom: 0
}

.product-deatil .name small {
    display: block
}

.product-deatil .name a {
    margin-left: 0
}

.product-deatil .price-container {
    font-size: 24px;
    margin: 0;
    font-weight: 300
}

.product-deatil .price-container small {
    font-size: 12px
}

.product-deatil .fa-2x {
    font-size: 16px!important
}

.product-deatil .fa-2x>h5 {
    font-size: 12px;
    margin: 0
}

.product-deatil .fa-2x+a,
.product-deatil .fa-2x+a+a {
    font-size: 13px
}

.product-deatil .certified {
    margin-top: 10px
}

.product-deatil .certified ul {
    padding-left: 0
}

.product-deatil .certified ul li:not(first-child) {
    margin-left: -3px
}

.product-deatil .certified ul li {
    display: inline-block;
    background-color: #f9f9f9;
    padding: 13px 19px
}

.product-deatil .certified ul li:first-child {
    border-right: none
}

.product-deatil .certified ul li a {
    text-align: left;
    font-size: 12px;
    color: #6d7a83;
    line-height: 16px;
    text-decoration: none
}

.product-deatil .certified ul li a span {
    display: block;
    color: #21c2f8;
    font-size: 13px;
    font-weight: 700;
    text-align: center
}

.product-deatil .message-text {
    width: calc(100% - 70px)
}

@media only screen and (min-width:1024px) {
    .product-content div[class*=col-md-4] {
        padding-right: 0
    }
    .product-content div[class*=col-md-8] {
        padding: 0 13px 0 0
    }
    .product-wrap div[class*=col-md-5] {
        padding-right: 0
    }
    .product-wrap div[class*=col-md-7] {
        padding: 0 13px 0 0
    }
    .product-content{// .product-image {
        border-right: 1px solid #dfe5e9
    }
    .product-content .product-info {
        position: relative
    }
}

</style>

