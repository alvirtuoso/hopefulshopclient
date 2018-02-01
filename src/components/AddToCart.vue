<template>
    <span>
        <button @click="onAdd" v-if="item.offerListingId.length != 0" class="btn add-to-cart">Add to cart</button>
    </span>
</template>
<script>

export default{
    name:'add-to-cart',
    props:['item'],
    methods:{
        onAdd: function(){
            var cartItem = {
                item: this.item,
                OfferListingId: this.item.offerListingId, 
                quantity:1
            }

            this.$store.dispatch('UpdateCartItems', {action:'add', item: cartItem})
            // router.push('cart')
            this.$router.push('cart')
        }
    }
} 
</script>

