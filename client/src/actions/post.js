import axios from 'axios';
import {setAlert} from './alert';

import {
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	ADD_COMMENT,
	REMOVE_COMMENT
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
	
	try {
		const res = await axios.get('https://mernstack-shrnu.run-us-west2.goorm.io/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
		
	} catch(err){
		console.log("statusText error from getPosts", err)
		
		dispatch({
			
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}


// Add like
export const addLike = id => async dispatch => {
	
	try {
		const res = await axios.put(`https://mernstack-shrnu.run-us-west2.goorm.io/api/posts/like/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: {id, likes: res.data}
		});
		
	} catch(err){
		dispatch({
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Remove like
export const removeLike = id => async dispatch => {
	
	try {
		const res = await axios.put(`https://mernstack-shrnu.run-us-west2.goorm.io/api/posts/unlike/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: {id, likes: res.data}
		});
		
	} catch(err){
		dispatch({
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Delete Post
export const deletePost = id => async dispatch => {
	
	try {
		await axios.delete(`https://mernstack-shrnu.run-us-west2.goorm.io/api/posts/${id}`);
		dispatch({
			type: DELETE_POST,
			payload: id
		});
		
		dispatch(setAlert('Post removed', 'success'))
		
	} catch(err){
		console.error("this is the error", err)
		dispatch({
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Add Post
export const addPost = formData => async dispatch => {
	
	const config ={
		headers:{
			'Content-type': 'application/json'
		}
	}
	
	try {
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/posts', formData, config);
		dispatch({
			type: ADD_POST,
			payload: res.data
		});
		
		dispatch(setAlert('Post Created', 'success'))
		
	} catch(err){
		
		dispatch({
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// Get post
export const getPost = id => async dispatch => {
	
	try {
		const res = await axios.get(`https://mernstack-shrnu.run-us-west2.goorm.io/api/posts/${id}`);
		dispatch({
			type: GET_POST,
			payload: res.data
		});
		
	} catch(err){
		// console.log("statusText error from getPost", err)
		
		dispatch({
			
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}


// Add Comment
export const addComment = (postId, formData) => async dispatch => {
	
	const config ={
		headers:{
			'Content-type': 'application/json'
		}
	}
	
	try {
		const res = await axios.post(`https://mernstack-shrnu.run-us-west2.goorm.io/api/posts/comment/${postId}`, formData, config);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});
		
		dispatch(setAlert('Comment Added', 'success'))
		
	} catch(err){
		
		dispatch({
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

//Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
	
	try {
		await axios.delete(`https://mernstack-shrnu.run-us-west2.goorm.io/api/posts/comment/${postId}/${commentId}`);
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});
		
		dispatch(setAlert('Comment Removed', 'success'))
		
	} catch(err){
		
		dispatch({
			type: POST_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}


