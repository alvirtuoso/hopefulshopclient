<template>
 <div>
    <b-popover placement="bottom" triggers="hover" :content="text">
        <h6>{{ellipsedText}}</h6>

    </b-popover>
 </div>
</template>
<script>
// item.displayedPrice is the discounted price displayed for an item. The item.Price is the original price as shown by amazon api xml data
import Mixin from '../helpers/mixin'
export default{
        name: 'ellipsis',
        mixins: [Mixin],
        props: ['text', 'length'],
        computed:{
            ellipsedText: function(){
                return this.ellipsisText(this.text, this.length)
            }
        }
    }

</script>
<style scoped>

</style>