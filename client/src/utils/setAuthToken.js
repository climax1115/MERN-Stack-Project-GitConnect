import axios from 'axios'; 
import { setAlert } from '../actions/alert';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token; 
    } else {
        delete axios.default.headers.common['x-auth-token']; 
    }
}

export default setAuthToken; 