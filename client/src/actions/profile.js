import axios from 'axios';
import {setAlert} from './alert';

import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_REPOS
} from './types';

// Get current users profile

export const getCurrentProfile = () => async dispatch =>{
	try{
		const res = await axios.get('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/me');
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}

		});
	}
}

// Get All Profiles
export const getProfiles = () => async dispatch =>{
	dispatch({type: CLEAR_PROFILE});
	
	try{
		const res = await axios.get('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile');
		
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}

		});
	}
}


// Get All Profiles
export const getProfileById = userId => async dispatch =>{
	
	try{
		const res = await axios.get(`https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/user/${userId}`);
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}

		});
	}
}


// Get Github reposs
export const getGithubRepos = username => async dispatch =>{
	
	try{
		const res = await axios.get(`https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/github/${username}`);
		
		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}

		});
	}
}



//Create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}
		
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile', formData, config);
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));
		
		if(!edit) {
			history.push('/dashboard');
		}
		
		
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}
		
		const res = await axios.put('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/experience', formData, config);
		
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert('Experience Added', 'success'));
		
		
		history.push('/dashboard');
		
		
		
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}
		
		const res = await axios.put('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/education', formData, config);
		
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert('Education Added', 'success'));
		
		
		history.push('/dashboard');
		
		
		
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Delete experience
export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/experience/${id}`)
		
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert('Experience removed', 'success'));
		
	} catch(err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Delete education
export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/education/${id}`)
		
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert('Education removed', 'success'));
		
	} catch(err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

//Delete account and profile
export const deleteAccount = () => async dispatch => {
	
	if(window.confirm('Are you sure? This cannot be undone!')){
	   try {
			await axios.delete('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile')

			dispatch({type: CLEAR_PROFILE});
		   	dispatch({type: ACCOUNT_DELETED});

			dispatch(setAlert('Your account has been permanently deleted'));

		} catch(err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {msg: err.response.statusText, status: err.response.status}
			});
		}
	}
	
	
	
}


