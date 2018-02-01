<template>
    <div>
        <!-- Modal Component -->
        <b-modal id="contact"
                 ref="contact"
                 title="Contact Us"
                 @ok="handleOk"
                 @shown="clearFields">
                <transition name="fade">
                    <p v-if="verify" class="error">{{verification}}.</p>

                </transition>

            <form @submit.stop.prevent="handleSubmit">
                <vue-recaptcha
                    ref="invisibleRecaptcha"
                    @verify="onVerify"
                    @expired="onExpired"
                    sitekey="6LfT3TAUAAAAACJbjauH1YLay3ifEMrJUTDqAvv2">
                </vue-recaptcha>
                <label>Name:</label>
                <b-form-input type="text" placeholder="Enter your name" v-model="name"></b-form-input>
                <label>Email:</label>
                <b-form-input type="text" placeholder="Enter your email" v-model="email"></b-form-input>
                <label>Subject</label>
                <b-form-input type="text" placeholder="Subject" v-model="subject"></b-form-input>
                <label>Notes</label>
                <textarea class="form-control" id="form-group-input" v-model="notes" placeholder="Enter your message" name="notes" rows="6"></textarea>

            </form>

        </b-modal>

    </div>
</template>

<script>
import Mixin from '../helpers/mixin'
import UserSvc from '../services/UserSvc'
import VueRecaptcha from 'vue-recaptcha';

export default {
    name: 'contact',
    components: { VueRecaptcha },
    mixins: [Mixin],
    props:[],
    data: function(){
        return{'email': '', 'name': 'nammm', 'subject': null, 'notes': null, 'verify': false, 'verification': null, 'capchaVerified': null}
    },
    computed:{
        isNotRobot: function(){
            return this.capchaVerified != null && this.capchaVerified != '';
        }
    },
    methods: {
        onSubmit: function () {
        this.$refs.invisibleRecaptcha.execute()
        },
        onVerify: function (response) {
        console.log('Verify: ' + response)
            this.capchaVerified = response;
        },
        onExpired: function () {
        console.log('Expired')
        },
        resetRecaptcha () {
        this.$refs.recaptcha.reset() // Direct call reset method
        },
        clearFields() {
            this.name = '';
            this.notes = '';
            this.verification = '';
            this.email = '';
            this.subject = '';

        },
        handleOk(e) {
            e.cancel();
            this.verify = true
            if (!this.name || !this.email) {
                this.verification = "Name and email are required"
            }
            else if(this.email && !this.isEmail(this.email)){
                this.verification = "Check email format"
            }else if(this.name && this.name.length > 50){
                this.verification = "Name has 40 characters limit"
            }else if(this.subject && this.subject.length > 90){
                this.verification = "Subject has 20 characters limit"
            }else if(this.notes && this.notes.length > 5000){
                this.verification = "Notes have 100 characters limit"
            }else if(!this.isNotRobot){
                this.verification = "Are you a Robot?"
            }
            else {
                this.handleSubmit()
                this.verify = false;
            }

        },
        handleSubmit() {
            UserSvc.sendMessage({
                'name': this.removeSpecialChars(this.name)
                , 'email': this.removeEmailSpecialChars(this.email)
                ,'subject':this.removeSpecialChars(this.subject)
                ,'notes': this.removeSpecialChars(this.notes)
            }).then(
                resp => {console.log('handleSubmit', resp.data)}
            ).catch(
                error => {
                    this.$store.dispatch('FindAuthError', error.response.data)
                    }

            )

            this.clearFields();
            this.$refs.contact.hide()
        }
        }

}
</script>

<style scoped>
.error{
  color:darkred;
}

</style>

