<template>
<div class="row">

  <div class="col-sm-3" v-for="item in $store.state.itemList"  v-bind:key="item.id">
    <div class="card">
        <img class="card-img-top" :src= "item.urlMediumImage" :alt="item.title">
        <div class="card-block padding-5">
            <b-popover :placement="'bottom'" :triggers="['hover']">
              <p class="title-collapse">
                   <a href="#">{{item.title}}</a>
              </p>
                <span slot="content">{{item.title}} </span>
           </b-popover>
             <label>34 reviews</label>
        </div>
    </div>

  </div>
</div>
</template>

<script>
// import AmazonSvc from '../services/AmazonSvc';

export default{
    name:'card-list',
    props:['items'],
    data: function(){
      return {
        itemList: [],
        keywords:''
      }
    },
    mounted(){
// console.log('cardList prop items: ', this.items);

    },
    methods:{

    }
}
</script>

<style scoped>
.padding-5 {
   padding: 5px !important;
}
.pagination {
  background-color: yellow;
}
.page-item {
  color: red;
}
.text-collapse{
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  display: block;
  /* autoprefixer: off */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 50px;
  font-weight: 500;
  line-height: 1.2em;
}

.title-collapse {
  font-weight: 500;
  height: 40px;
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  margin-bottom: 1em;
}
.title-collapse:after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 5px;
  padding: 0 1.2em;
  background: inherit;
}
.title-collapse span:after {
  content: '\0000a0';
  position: absolute;

  z-index: 1;

}

</style>
