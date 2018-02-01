export default {
    methods:{
        guid: function() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
        },
        scrollToTop(scrollDuration) {
            var cosParameter = window.scrollY / 2,
                scrollCount = 0,
                oldTimestamp = performance.now();
            function step (newTimestamp) {
                scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
                if (scrollCount >= Math.PI) window.scrollTo(0, 0);
                if (window.scrollY === 0) return;
                window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
                oldTimestamp = newTimestamp;
                window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        },
        s4: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        },
        isAmazonId: function(str){
            var regex = /(-20)$/;
            var valmatch = str.match(regex);
            if(valmatch){
                return true
            }else return false            
        },
        // str ex. 4.5 of 5 stars
        extractNumber: function(str){
            var regex = /[+-]?\d+(\.\d+)?/g;
            var valmatch = str.match(regex);
            if(valmatch){
                var floats = valmatch.map(function(v) {
                    if(v && isNaN(parseFloat(v))){
                        return [0]
                    }
                    if(v){
                        return parseFloat(v);
                    }
                });
                return floats[0];
            }
        },
        isEmail: function(str){
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var valmatch = str.match(regex);
            if(valmatch){
                return true
            }else return false
        },
        // format to currency
        formatPrice: function(n, currency) {
            if(n && currency){
                // console.log('formatted', currency +  " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"))
                return currency +  " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
        },
        ellipsisText: function(text, value){
            return text.substring(0, value) + '...';

        },
        removeSpecialChars(str){
            if(str){

                return str.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            }
        },
        removeEmailSpecialChars(str){
            if(str){

                return str.replace(/[`~!#$%^&*()|+=?;:'",<>\{\}\[\]\\\/]/gi, '');
            }
        },
        hasSpecialChars(str){
            if (str.match(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi)) {
                // special char found
                return true;
            }else
                return false
        },
        hasLeadingZero(str){
            if(str.match(/^0+/)){
                return true;
            }else
                return false;
        },
        // This function has been moved to store.js as DetectCountry but does not use jquery
        visitorCountry(){

            $.ajax({
            url:"http://api.wipmania.com/jsonp?callback=?",
            dataType:"jsonp"
            }).done(function(data){
                switch(data.address.country_code){
                    case "US" :
                    $("#log").html("From US");
                    break;
                    case "IN" :
                    $("#log").html("From IN");
                    break;
                    default:
                    $("#log").html("You Are From: "+data.address.country_code);
                    break;
                }
            });

        }
    }
}