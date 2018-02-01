import axios from 'axios'
import { API_LOGCLIENT, LOGCLIENT_ADD, LOGCLIENT_DELETE } from './Constants'

export default {
    addLog(log){
        axios.post(LOGCLIENT_ADD, log);
    },
    deleteLog(id){
        axios.delete(id);
    }
}
