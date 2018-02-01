<template>
<div class="row">
    <footer class="footer">
        <div class="container">
        <div class="row">
            <div class="col-md6">
            </div>
        </div>
            <div class="row">
                <div class="col-md-5">
                    <h5><i class="fa fa-road"></i> Amazon45.</h5>
                    <div class="row">
                        <div class="col-6">
                            <ul class="list-unstyled">
                                <li><a href="">Product</a></li>
                                <li><a href="">Benefits</a></li>
                                <li><a href="">Partners</a></li>
                                <li><a href="">Team</a></li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <ul class="list-unstyled">
                                <li><a href="">Documentation</a></li>
                                <li><a href="">Support</a></li>
                                <li><a href="">Legal Terms</a></li>
                                <li><a href="">About</a></li>
                            </ul>
                        </div>
                    </div>
                    <ul class="nav">

                        <social-sharing url="www.shopping45" inline-template>
                        <div>
                            <network network="facebook">
                                <icon name="facebook-square" color="#3B5998" cursor="pointer" scale="3"></icon>
                            
                            </network>
                            <network network="googleplus">
                            <icon name="google-plus-square" color="#DD4B39" cursor="pointer" scale="3"></icon>
                            </network>
                            <network network="pinterest">
                            <icon name="pinterest-square" color="#CC2127" cursor="pointer" scale="3"></icon>
                            </network>
                            <network network="twitter">
                            <icon name="twitter-square" color="#55ACEE" cursor="pointer" scale="3"></icon>
                            </network>
                        </div>
                        </social-sharing>

                    </ul>
                    <br>
                </div>
                <div class="col-md-2">
                    <h5 class="text-md-right">Contact Us</h5>
                    <hr>
                </div>
                <div class="col-md-5">
                    <form>
                        <fieldset class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea class="form-control" id="exampleMessage" placeholder="Message"></textarea>
                        </fieldset>
                        <fieldset class="form-group text-xs-right">
                            <button type="button" class="btn btn-secondary-outline btn-lg">Send</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import {REVIEWS} from '../services/Constants'
export default{
        name:'bottom',
        created(){
                console.log('bootm', REVIEWS)
                //var amzxml = new JKL.ParseXML('../assets/xml.xml');
            //     var amzdata = amzxml.parse();
            //     console.log(amzdata.ItemSearchResponse.Items.Item[0].ASIN);
        },
        computed:{
            // counter(){
            //     return this.$store.state.count;
            // }
        }
    }
</script>
<style scoped>
    footer{
        margin-top: 40px;
    }
</style>