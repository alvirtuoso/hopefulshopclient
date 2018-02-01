<template>
<div class="col-12 mt-5">
    <div class="col-8 offset-2">
        <div class="text-center">

        Wanted to help someone by raising funds?
        Shop and 100% of the earned fees will be donated.

        </div>
    </div>

    <div class="jumbotron text-center bg">
        <h1>How it works</h1>
        <div class="row justify-content-around">
                <div class="col-2 text-center">
                    <!-- <img class="img-thumbnail" src="../assets/affiliate.png" alt="Affiliate"> -->
                    
                    
                        <div class="circle">
                            <span>
                                1
                                <h6>AFFILIATE</h6>
                            </span>
                        </div>
                    <article class="brk-word">    
                        Get your affiliate ID from amazon.
                    </article>
                </div>
                <div class="col-2">
                        <div class="circle">
                            <span>
                                3
                                <h6>SHARE</h6>
                            </span>
                        </div>
                    <article class="brk-word">
                        
                         www.hopeful.shop/amzn_id
                    </article>
                </div>
                <div class="col-2">
                    <!-- <img class="img-thumbnail" src="../assets/payment.png" alt="Payment"> -->
                        <div class="circle">
                            <span>
                                2
                                <h6>RECEIVE</h6>    
                            </span>
                        </div>                   
                    <article class="brk-word">
                        Access your earnings from amazon affilate page
                    </article>
                </div>

            </div>
            
        
    </div>

</div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.bg{
      background: #fff;
}
.circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    font-size: 30px;
    background: rgb(243, 191, 114);
    line-height: 150px;
    text-align: center;
    margin: auto;
}
.circle span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    padding: 0 25px;
}
.brk-word{
    word-break:break-word;
    margin-top: 20px;
}
</style>
