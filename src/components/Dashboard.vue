<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-4 sidebar1">
                <div class="logo">
                    <!-- <img src="http://lorempixel.com/output/people-q-g-64-64-1.jpg" class="img-responsive center-block" alt="Logo"> -->
                </div>
                <br>
                <div class="pr-4">
                    <ul class="list">
                        <h5><strong>Settings</strong></h5>
                        <li>{{currentUser}}
                        <li>
                            <button class="btn btn-success btn-sm rounded-circle" @click="signOut"><icon name="power-off" color="#fff" cursor="pointer" scale="1.75"></icon></button>
                        </li>


                    </ul>
                </div>
            </div>
            <div class="col-md-8 col-sm-8 sidebar1">
                <!--Main content code to be written here -->
                <div class="text-left mb-2">
                    <label v-if="!$v.associateId.maxLength">Associate ID must be no more than {{$v.associateId.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.associateId.required">Associate ID is required.</label>
                    <label v-if="!$v.subdomain.maxLength">Subdomain must be no more than {{$v.subdomain.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.first.maxLength">Firstname must be no more than {{$v.first.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.last.maxLength">Lastname must be no more than {{$v.last.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.address.maxLength">Address must be no more than {{$v.address.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.city.maxLength">City must be no more than {{$v.city.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.state.maxLength">State must be no more than {{$v.state.$params.maxLength.max}} characters.</label>
                    <label v-if="!$v.zip.maxLength">Zip must be no more than {{$v.zip.$params.maxLength.max}} characters.</label>
                     <label v-if="!$v.phone.maxLength">Phone must be no more than {{$v.phone.$params.maxLength.max}} characters.</label>

                        <div class="input-group mt-5">
                            <label for="subdomain" class="col-2 col-form-label">Your URL</label>
                            <!-- <span class="input-group-addon">www.</span> -->
                            <span class="input-group-addon">www.{{domain}}/</span>
                            <input type="text" class="subdomain" v-model.trim="subdomain" @blur="$v.subdomain.$touch()" placeholder="complete your URL">
                            <button class="btn btn-success auth-button ml-1" @click="saveSubDomain">Save</button>
                            <click-confirm placement="bottom">
                                <button class="btn btn-danger auth-button ml-1" @click="deleteSubdomain">Delete</button>
                            </click-confirm>
                            <transition name="fade">
                                <div v-show="message" class="ml-2">
                                    <icon name="check" color="#00b494" scale="1.25"></icon>
                                    <label class="pl-1">{{message}}</label>
                                </div>
                            </transition>
                        </div>
<hr/>
                    <div class="form-group row">
                        <label for="associateId" class="col-2 col-form-label">Amazon Associate ID</label>
                        <div class="col-6">
                            <input class="form-control" v-model="associateId" type="text"  @blur="$v.associateId.$touch()" placeholder="associate ID">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="first" class="col-2 col-form-label">First</label>
                        <div class="col-6">
                            <input class="form-control" v-model="first" type="text"  @blur="$v.first.$touch()" placeholder="first name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="last" class="col-2 col-form-label">Last</label>
                        <div class="col-6">
                            <input class="form-control" v-model="last" type="text"  @blur="$v.last.$touch()" placeholder="last name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="phone" class="col-2 col-form-label">Phone</label>
                        <div class="col-6">
                            <input class="form-control" v-model="phone" type="text"  @blur="$v.phone.$touch()" placeholder="phone">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="address" class="col-2 col-form-label">Address</label>
                        <div class="col-6">
                            <input class="form-control" v-model="address" type="text" @blur="$v.address.$touch()" placeholder="address">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="state" class="col-2 col-form-label">State</label>
                        <div class="col-6">
                            <input class="form-control" v-model="state" type="text" @blur="$v.state.$touch()" placeholder="state">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="city" class="col-2 col-form-label">City</label>
                        <div class="col-6">
                            <input class="form-control" v-model="city" type="text" @blur="$v.city.$touch()" placeholder="city">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="zip" class="col-2 col-form-label">Zip</label>
                        <div class="col-6">
                            <input class="form-control" v-model="zip" type="text" @blur="$v.zip.$touch()" placeholder="zip">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="action" class="col-2 col-form-label"></label>
                        <div class="col-6">
                             <button class="btn btn-success" @click="saveProfile" v-bind:disabled="isInvalid">Save</button>
                            <br>
                            <transition name="fade">
                                <div v-show="savingProfile" class="ml-2">
                                    <icon name="refresh" spin></icon>
                                    <label class="pl-1">{{savingProfile}}</label>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <br>
                    <br>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import firebase from 'firebase'
import { required, maxLength } from 'vuelidate/lib/validators'
import DnsSvc from '../services/DnsService'
import Mixin from '../helpers/mixin'
import UserSvc from '../services/UserSvc'
import LogSvc from '../services/LogSvc'
import { LOG_TYPE_ERROR, LOG_TYPE_INFO, LOG_TYPE_WARNING } from '../services/Constants'
// import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
    name:'dashboard',
    mixins: [Mixin],
    mounted(){
        if(this.currentUser){
            this.findDnsByEmail(this.currentUser)
            UserSvc.getUserByEmail(this.currentUser).then(resp => {
                this.first = resp.data.first
                this.associateId = resp.data.associateId
                this.last = resp.data.last
                this.phone = resp.data.phone
                this.state = resp.data.state
                this.address = resp.data.address
                this.city = resp.data.city
                this.zip = resp.data.zip
            }).catch(function (error) {
            if (error.response) {
                LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": "Dashboard.vue mounted()=>> " + error.response.data, "UserEmail": this.currentUser})
            }
        });
        }
    },
    data: function(){
        return{
            domain: DnsSvc.getDomain(window.location.hostname),
            subdomain: null,
            first: null,
            last: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            email: null,
            phone: null,
            associateId: null,
            message: null,
            savingProfile: null
        }
    },
    validations: {
        subdomain: {
            maxLength: maxLength(80)
        },
        first: {
            required,
            maxLength: maxLength(80)
        },
        last: {
            required,
            maxLength: maxLength(80)
        },
        address:{
            maxLength: maxLength(100)
        },
        city:{
            maxLength: maxLength(100)
        },
        state:{
            maxLength: maxLength(50)
        },
        zip:{
            maxLength: maxLength(20)
        },
        associateId: {
            required,
            maxLength: maxLength(40)
        },
        phone:{
             maxLength: maxLength(20)
        }

    },
    computed:{
        isInvalid: function(){
            var b = false;
            if(this.$v.subdomain.$invalid || this.$v.first.$invalid || this.$v.last.$invalid){
                b = true
            }
          return b
        },
        currentUser: function(){
            // TODO: replace the test email with firebase email - firebase.auth().currentUser.email
            return firebase.auth().currentUser.email
        },
        apiMessage: function(){
            if(!this.$store.state.authError){
            return false
            }else return true
        }
    },
    methods: {
        signOut: function(){
            firebase.auth().signOut()
            this.$router.push('login')
        },
        saveProfile: function(){
            this.savingProfile = "Saving Profile..."
            this.isInvalid = true;
            UserSvc.addUser({"first": this.removeSpecialChars(this.first),
                "last": this.removeSpecialChars(this.last), "phone": this.removeSpecialChars(this.phone),
                "email": this.currentUser, "address": this.removeSpecialChars(this.address),
                "city": this.removeSpecialChars(this.city), "state": this.removeSpecialChars(this.state),
                "zip": this.removeSpecialChars(this.zip), "associateId": this.removeSpecialChars(this.associateId)})
                .then(resp => {
                    this.savingProfile = '';
                        this.$store.dispatch('FindAuthError', 'Saved Successfully')
                       // Clear the message after 3 seconds
                        this.clearMessage();
                    })
                  .catch(function (error) {
                        if (error.response) {
                            this.savingProfile = '';
                            this.clearMessage();
                             this.$store.dispatch('FindAuthError', "Error " + error.response.status)
                             LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": "Dashboard.vue saveProfile()=>> " + error.response.data, "UserEmail": this.currentUser})
                        }
                    });
        },
        saveSubDomain: function(){
            this.subdomain = this.removeSpecialChars(this.subdomain)
            this.message = "Saving..."
            // Save to DB
            DnsSvc.saveDns({"domain": this.domain, "name": this.subdomain, "ownerEmail":this.currentUser, "userId": this.$store.state.user.userId})
                  .then(resp => {
                        this.message = 'Saved Successfully'
                        // Clear the message after 3 seconds
                        this.clearMessage();
                      })
                  .catch(function (error) {
                        if (error.response) {
                             this.message = error.response.status
                             LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": "Dashboard.vue saveSubDomain()=>> " + error.response.data, "UserEmail": this.currentUser})
                        }
                    });
        },
        deleteSubdomain: function(){
           this.subdomain = null
           this.associateID = null
           // Delete in DB
            DnsSvc.deleteDnsByEmail(this.currentUser)
                .then(resp => {
                        this.message = "Deleted successfully"
                        this.clearMessage();
                    })
                  .catch(function (error) {
                        if (error) {
                             this.message = error.response.status
                            LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": "Dashboard.vue deleteSubdomain()=>> " + error.response.data, "UserEmail": this.currentUser})
                        }
                    });
        },
        clearMessage: function () {
            setTimeout(() => {
                this.message = '';
                this.isInvalid = false;
                this.$store.dispatch('FindAuthError', '')
                }, 3000)

        },
        findDnsByEmail: function(email){
            var d = null
            DnsSvc.getDnsbyEmail(email)//(firebase.auth().currentUser.email)
                    .then(resp => {
                        console.log('getDnsEmail',resp)
                            if(resp && resp.data && resp.data.name)
                                this.subdomain = resp.data.name
                         }).catch(function(error){
                             if(error){
                             this.$store.dispatch('FindAuthError', 'Error ' + error)
                             LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": "Dashboard.vue findDnsByEmail()=>> " + error.response.data, "UserEmail": this.currentUser})
                             }
                         })

        }
    }
}
</script>

<style scoped>
.sidebar1 {
    background: #F17153;
    /* For browsers that do not support gradients */
    background: -webkit-linear-gradient(#F17153, #F58D63, #f1ab53);
    /* For Safari 5.1 to 6.0 */
    background: -o-linear-gradient(#F17153, #F58D63, #f1ab53);
    /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(#F17153, #F58D63, #f1ab53);
    /* For Firefox 3.6 to 15 */
    background: linear-gradient(#F17153, #F58D63, #f1ab53);
    /* Standard syntax */
    padding: 0px;
    min-height: 100%;
}
  .subdomain {
    /* margin: 10px 0; */
    border: none;
  }
label {
    color: #fff;
}
hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1.25px solid #ccc;
    margin: 2em 0;
    padding: 0;
}
.logo {
    max-height: 130px;
}
.error{
  color:darkred;
}
.logo>img {
    margin-top: 30px;
    padding: 3px;
    border: 3px solid white;
    border-radius: 100%;
}
.list {
    color: #fff;
    list-style: none;
    padding-left: 0px;
}
.list::first-line {
    color: rgba(255, 255, 255, 0.5);
}
.list> li, h5 {
    padding: 5px 0px 5px 40px;
}
.list>li:hover {
    background-color: rgba(255, 255, 255, 0.2);
    /* border-left: 5px solid white; */
    color: white;
    font-weight: bolder;
    padding-left: 35px;
    cursor: pointer;
}
</style>
