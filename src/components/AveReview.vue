<template>
<div>
 <star-rating :rating="computedStars" :star-size="20" :read-only="true" :increment="0.01"></star-rating>

</div>
</template>
<script>

import AmazonSvc from '../services/AmazonSvc'
import Mixin from '../helpers/mixin'
import {REVIEWS} from '../services/Constants'
    export default{
        name: 'ave-review',
        mixins: [Mixin],
        props: ['item'],
        mounted(){

        },
        data: function() {
            return {
                urlData: this.item.urlReview,
                starLabel: '',
                averageStars: 0
            }
        },
        computed:{
            computedStars: function(){
                // return this.urlReviewIndex
                // console.log('urlRevew', this.urlData)
                AmazonSvc.getItemAveReviews(this.urlData)
                    .then(resp => { 
                        // this.$store.state.itemList[this.urlReviewIndex].starLabel = resp.data
                            this.starLabel = resp.data
                            this.item.starLabel = this.starLabel
                            this.averageStars = this.extractNumber(this.starLabel)
                            this.item.averageStars = this.averageStars
                        })
             return this.averageStars;
                // return   this.$store.state.itemList[this.urlReviewIndex].starLabel
            }
        }
    }
</script>
<style scoped>

.rating-text{
    margin-top: 1px;
}
</style>