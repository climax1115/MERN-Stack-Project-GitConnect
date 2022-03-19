import axios from 'axios'; 
import { setAlert } from './alert'; 

import {
    GET_PROFILE, 
    PROFILE_ERROR, 
    UPDATE_PROFILE, 
    GET_PROFILES, 
    CLEAR_PROFILE, 
    GET_REPOS
} from './types'; 

// Get the current users profile 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me'); 

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: '', status: '' }
        }); 
    }
}; 

//get all the profile 
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE }); 

    try {
        const res = await axios.get('/api/profile'); 

        dispatch({
            type: GET_PROFILES, 
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: '', status: '' }
        }); 
    }
};

//get profile by Id
export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`); 

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: '', status: '' }
        }); 
    }
};

//get Github repos 
export const getGithubRepos = username => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`); 

        dispatch({
            type: GET_REPOS, 
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: '', status: '' }
        }); 
    }
};

//Create or update profile 
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        
        dispatch({
            type: GET_PROFILE, 
            payload: res.data 
        }); 

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')); 

        if(!edit) {
            history.push('/dashboard'); 
        }
    } catch (err) {
        const errors = err.response.data.errors; 

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }; 

        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

//Add experience 
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);
        
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data 
        }); 

        dispatch(setAlert('Experience Added!', 'success')); 

        history.push('/dashboard'); 
     
    } catch (err) {
        const errors = err.response.data.errors; 

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }; 

        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

//Add education 
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);
        
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data 
        }); 

        dispatch(setAlert('Education Added!', 'success')); 

        history.push('/dashboard'); 
     
    } catch (err) {
        const errors = err.response.data.errors; 

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }; 

        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}
