import firebase from 'firebase'
import LogSvc from '../services/LogSvc'
import { LOG_TYPE_ERROR, LOG_TYPE_INFO, LOG_TYPE_WARNING } from '../services/Constants'
import {store} from '../main'
import UserSvc from '../services/UserSvc'

export function fireInit() {
	//  Firebase settings 
	var config = {
        apiKey: "AIzaSyBUyHX7jHfeWt9DyjtZkF7XVg4oqi_MquE",
        authDomain: "shop-fe3bb.firebaseapp.com",
        databaseURL: "https://shop-fe3bb.firebaseio.com",
        projectId: "shop-fe3bb",
        storageBucket: "shop-fe3bb.appspot.com",
        messagingSenderId: "95052498324"
	}
	firebase.initializeApp(config)

    // Detect any login status
	firebase.auth().onAuthStateChanged(function (user) {
	  if (user) {
			LogSvc.addLog({"LogType": LOG_TYPE_INFO, "Note": "Signed In: " + user.email})
				// save to store
				UserSvc.getUserByEmail(user.email).then(resp => {
						store.dispatch('SetCurrentUser', { "email": user.email, "userId": resp.data.id})
					}).catch(function(error) {
						 console.log('no user found in the Database')
					})

	  } else {
         // Save to Log the Logout action and clear the store state
				LogSvc.addLog({"LogType": LOG_TYPE_INFO, "Note": "Logged Out: " + store.state.user.email})
			  store.dispatch('SetCurrentUser', {})
	  }
	}, function(error) {

	  console.log(error)
	})
}