import axios from 'axios'
import { SEND_MAIL, FIND_USER_BY_EMAIL, USER_ADD } from './Constants'

export default{
    getUsers(){
        axios.get(API_USER).then(data => {
            console.log('getUsers', data)
            // Show in UI

        })
    },
    removeUserById(id){
        axios.delete(USER_DELETE_BY_ID + id).then(result => {
            console.log('removeUserById', result)
        })
    },
    addUser(user){
        return axios.post(USER_ADD, user)
    },
    getUserByEmail(email){
       return axios.get(FIND_USER_BY_EMAIL + email)
    },
    isExistingUser(email){
        axios.get(IS_EXISTING_USER + email)
    },
    sendMessage(contactUs){
        console.log('sendMessage', contactUs)
        console.log('sendmessage', SEND_MAIL)
        return axios.post(SEND_MAIL, contactUs)
    }
}