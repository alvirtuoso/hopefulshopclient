<!-- *** Amazon API Doc: Using OfferListingId is the preferred method of identifying items to add to the cart *** -->
<template>
   <div class="ml-5 mr-5">
        <div class="row mb-4 mt-5 note-header">
            <div class="col-2">
                <h5>Shopping Cart</h5>
            </div>
            <div class="col-7">

                <router-link to="search">
                <icon name="backward" color="#55ACEE" cursor="pointer" scale=".75"></icon>
                    Back to search results
                </router-link>
            </div>
            <div class="col-3">

            </div>
        </div>
            <div class="row"> <!--  v-show="cartItems.length > 0"> -->
                <!-- Cart items -->
                <div class="col-8">
                    <div class="row">

                        <div class="col-8">

                        </div>
                        <div class="col-2"><h6>Price</h6></div>
                        <div class="col-2"><h6>Quantity</h6></div>

                    </div>
                    <!-- ****** Cart Limitations *******  http://docs.aws.amazon.com/AWSECommerceService/latest/DG/ShoppingCartConcepts.html
                    A cart can contain up to 50 entries. 
                    Each entry can represent one or more (up to 999) of the same items. 
                    That means that a Product Advertising API shopping cart can contain a maximum of almost 50,000 items.-->
                    <div class="list-group" v-for="(item, index) in cartItems" v-bind:key="item.id" v-if="index < 50">
                        <div class="row">
                            <div class="col-2 mx-auto">
                                <img :src= "item.item.urlLargeImage" alt="Image Not Available">
                            </div>
                            <div class="col-6 my-auto">
                                <h6>{{item.item.title}}</h6>
                                    <b-alert :show="showMessage" dismissible variant="warning">
                                        Quantity entered is more than in stock
                                    </b-alert>
                            </div>
                            <div class="col-2 my-auto"><price :item="item.item" :isCart="true"></price></div>
                            <div class="col-2 my-auto">
                                <input @keyup="onUpdateQuantity(item, index)" v-model="item.quantity" style="max-width:45px">
                                
                                <label v-if="!isValid || !$v.cartItems.$each[index].quantity.between" style="font-size:14px"> 0-99</label>

                            </div>
                        </div>

                    </div>                 
                </div>  <!-- end of Cart items -->

                <!-- Proceed to checkout -->
                <div class="col-4 my-auto bg-gray">
                    <div class="row justify-content-center">
                        <button @click="onCheckout" v-bind:disabled="cartItems < 1" type="button" class="btn btn-warning mt-2">Proceed to amazon checkout</button>
                        <p>(You will be redirected to amazon website)</p>
                    </div>
                    <div class="row justify-content-center">
                        <p><h5>Total: <span v-show="isValid">{{total}}</span> </h5></p>
                    </div>
                <b-alert :show="forwardToAmazon" variant="warning">
                    <div class="text-center">
                            <h6>Forwarding to Amazon.com</h6>
                            <pulse-loader color="#757575" size="10px"></pulse-loader>
                    </div>
                </b-alert>   
                </div> <!-- end of Proceed to Checkout -->
        </div>
</div>
   <!--</div> -->
</template>
<script>
import Mixin from '../helpers/mixin.js'
import { required, between } from 'vuelidate/lib/validators'
export default{
    name:'cart-items',
    mixins:[Mixin],
    data: function(){
        return{
            cartItems: this.$store.state.cartItems,
            isValid: true,
            forward: false
        }
    },
    validations:{
        cartItems:{
            $each:{
                quantity:{
                    required,
                    between: between(0,999)
                }
            }
        }
    },
    computed:{
        total: function(){
            var tot = 0;
            var currency ='';
            for(var i=0; i < this.$store.state.cartItems.length; i++){
                if(this.$store.state.cartItems[i].quantity > 0 
                    && this.$store.state.cartItems[i].quantity < 100){
                    tot = tot + (this.$store.state.cartItems[i].quantity * this.$store.state.cartItems[i].item.displayedPrice)
                }
                if(currency === '' && this.$store.state.cartItems[i].item.currencySign){
                    currency = this.$store.state.cartItems[i].item.currencySign;
                }
            }

            return this.formatPrice(tot, currency);
        },
        showMessage: function(){
            // Amazon API Doc: A cart can contain up to 50 entries. Each entry can represent one or more (up to 999) of the same items. 
            // That means that a Product Advertising API shopping cart can contain a maximum of almost 50,000 items.
            // Sometimes it is a limit set by the vendor, for example, they might set a limit on big ticket items, such as a motorcycle, of one per customer. 
            // If you add an item to the cart with a quantity that exceeds the maximum allowed, CartAdd automatically resets the quantity to the maximum value. No error is generated. 
            var countdown = 0; // in seconds
            if(this.cartItems.length > 50){
                countdown = 3;
            }
            else{
                countdown = 0;
                var totalItems = 0;
                for(var i=0; i < this.cartItems.length; i++){
                    totalItems = totalItems + this.cartItems[i].quantity;
                }
                if(totalItems > 999)
                    countdown = 3;
            }
            return countdown;
        },
        forwardToAmazon:function(){
            if(this.$store.state.error){
                this.forward = false
            }
            return this.forward
        }
    },
    methods:{
        onUpdateQuantity: function(cartItem, index){
            var q = cartItem.quantity.toString();
            if(q && q != ''){
                this.isValid = true;
                q = this.removeSpecialChars(q)
                q = q.replace(/[a-zA-ZÀ-ž]/, '') // remove alphabet and others like those in Germany, etc.
               // q = q.replace(/^0+/, '') // remove leading 0
                cartItem.quantity = q.trim();
                this.$store.dispatch('UpdateCartItems', {action:'update', item: cartItem, index: index})
            }else
                    this.isValid = false
        },
        onCheckout: function(){
            if(this.isValid){
                this.forward = true
                // Remove item with 0 quantity
                for(var i=0; i < this.cartItems.length; i++){
                    if(this.cartItems[i].quantity < 1){
                        this.$store.dispatch('UpdateCartItems', {action:'remove', item: this.cartItems[i]})
                    }
                }
                this.$store.dispatch('ProceedToCheckout', {
                        items:this.$store.state.cartItems, id: this.$localStorage.get('associateId'), country: this.$store.state.country
                    })
            }
            // this.$router.replace('www.google.com')
            // window.location = "http://www.yahoo.com"
        }
    }
}
</script>
<style lang="scss" scoped>
.amazon-blue{
    color: #167ac6;
    font-weight: 700;
}
img {
    max-height: auto;
    max-width: 75px;
}
</style>