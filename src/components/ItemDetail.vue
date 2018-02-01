<template>
<div v-if="itemSelected.title"> <!-- no item selected, so don't show this component' -->
    <div class="row">
        <div class="col-md-8">
            <div class="card">

                    <div class="wrapper row">
                        <div class="preview col-md-9">

                            <div class="preview-pic tab-content">
                                <div class="tab-pane" :class="{active: imgLink === activeImage}"
                                    v-for="(imgLink, index) in itemSelected.itemImages" v-bind:key="index">
                                    <!--<img :src="imgLink.urlLargeImage" />-->
                                    <img v-lazy="imgLink.urlLargeImage" class="img-fluid" />
                                </div>

                            </div>
                            <ul class="preview-thumbnail nav nav-tabs">

                                <li class="thumb" v-for="(imgLink, index) in itemSelected.itemImages" v-bind:key="index">
                                  <a @click="onThumbnailClick(imgLink)" :data-target="'#' + index" data-toggle="tab">
                                    <img :class="{activeThumb: activeImage === imgLink}" v-lazy="imgLink.urlThumbnail" />
                                  </a>
                                </li>
                            </ul>
                        </div>
                        <div class="details col-md-3 pading-detail">

                            <price :item="itemSelected"></price>
                            <div class="rating">
                                <ave-review :item="itemSelected" ref="review"></ave-review>
                            </div>
                            <add-to-cart :item="itemSelected"></add-to-cart>
                            <br/>
                            <ul class="nav"> 
                                <social-sharing :url="itemSelected.urlItemLink" inline-template>

                                <div>
                                    <network network="facebook">
                                        <icon name="facebook-square" color="#3B5998" cursor="pointer" scale="1.75"></icon>

                                    </network>
                                    <network network="googleplus">
                                    <icon name="google-plus-square" color="#DD4B39" cursor="pointer" scale="1.75"></icon>
                                    </network>
                                    <network network="pinterest">
                                    <icon name="pinterest-square" color="#CC2127" cursor="pointer" scale="1.75"></icon>
                                    </network>
                                    <network network="twitter">
                                    <icon name="twitter-square" color="#55ACEE" cursor="pointer" scale="1.75"></icon>
                                    </network>
                                </div>
                                </social-sharing>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <h6>{{itemSelected.title}}</h6>
                </div>
        <lazy-component>
            <item-tabs></item-tabs>
        </lazy-component>
      </div>
      <right></right>
    </div>
</div>
</template>
<script>
// This component is the detail page of the selected item. Contains pictures, features, reviews.
export default {
    name: 'item-detail',
    mounted(){
        // show default image the first time detail page is open/mounted
      this.activeImage = this.defaultImageSelected;
    },
    updated(){
        // When user starts clicking thumbnail to show corresponding large image, update cycle is fired
        // so use this.isActive flag so that the default image no longer active
        if(!this.isActive){
            this.activeImage = this.defaultImageSelected;
        }
    },
    data: function(){
        return{
            isActive: false,
            activeImage: null,
            test: "hereee"
        }
    },
    computed: {
        // this item is passed on from Middle.vue and Right.vue
        itemSelected: function(){
            this.isActive = false
            return this.$store.state.selectedItem
        },
        defaultImageSelected: function(){
            if(this.itemSelected && this.itemSelected.itemImages && this.itemSelected.itemImages.length > 0){
                // console.log('ItemDetail defaultImage',this.itemSelected.itemImages[0])
                return this.itemSelected.itemImages[0]
            }
        },
        featuresText: function(){
            var txt = "";
            for(var i = 0; i < this.itemSelected.features.length; i++){
                txt = txt + '<p>' + this.itemSelected.features[i] + '</p>'
            }
            return txt;
        }
    },
    methods:{
        onThumbnailClick: function(imgLink){
            this.isActive = true
            return this.activeImage = imgLink
        }
    }
}
</script>
<style scoped>
.prime{
      color: #167ac6;
}
.modal-90 {
  width: 90%;

}
.activeThumb{
    border-width: 6px;
    border-color: #ffcc66;
    border-style: solid;
}
.thumb:hover{
    cursor:pointer
}
.margin-50{
    margin-top:-50px;
    padding-right: 5px;
}
.margin-tab{
    margin-top: 2px;
    padding-right: 5px;
}
.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column; }
  @media screen and (max-width: 996px) {
    .preview {
      margin-bottom: 20px; } }

.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1; }

.preview-thumbnail.nav-tabs {
  border: none;
  margin-top: 15px; }
  .preview-thumbnail.nav-tabs li {
    width: 18%;
    margin-right: 2.5%; }
    .preview-thumbnail.nav-tabs li img {
      max-width: 100%;
      display: block; }
    .preview-thumbnail.nav-tabs li a {
      padding: 0;
      margin: 0; }
    .preview-thumbnail.nav-tabs li:last-of-type {
      margin-right: 0; }

.tab-content {
  overflow: hidden; }
  .tab-content img {
    -webkit-animation-name: opacity;
            animation-name: opacity;
    -webkit-animation-duration: .3s;
            animation-duration: .3s; }

.card {
  padding: 1em 3em;
  line-height: 1.5em; }

@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex; } }

.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column; }

.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1; }

.product-title, .price, .sizes, .colors {
  text-transform: UPPERCASE;
  font-weight: bold; }

.checked, .price span {
  color: #ff9f1a; }

.product-title, .rating, .product-description, .price, .vote, .sizes {
  margin-bottom: 15px; }

.product-title {
  margin-top: 0; }

.size {
  margin-right: 10px; }
  .size:first-of-type {
    margin-left: 40px; }

.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px; }
  .color:first-of-type {
    margin-left: 20px; }

.not-available {
  text-align: center;
  line-height: 2em; }
  .not-available:before {
    font-family: fontawesome;
    content: "\f00d";
    color: #fff; }

.orange {
  background: #ff9f1a; }

.green {
  background: #85ad00; }

.blue {
  background: #0076ad; }

.tooltip-inner {
  padding: 1.3em; }

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
            transform: scale(3); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
            transform: scale(3); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

</style>