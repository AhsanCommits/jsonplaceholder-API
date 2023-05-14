import axios from 'axios';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const SORT_POSTS = 'SORT_POSTS';

export const fetchPosts = () => {
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                dispatch(fetchPostsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchPostsFailure(error.message));
            });
    };
};

export const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS,
    payload: { posts }
});

export const fetchPostsFailure = error => ({
    type: FETCH_POSTS_FAILURE,
    payload: { error }
});

export const addPost = post => ({
    type: ADD_POST,
    payload: { post }
});

export const deletePost = id => ({
    type: DELETE_POST,
    payload: { id }
});

export const searchPosts = searchQuery => ({
    type: SEARCH_POSTS,
    payload: { searchQuery }
});

export const sortPosts = sortBy => ({
    type: SORT_POSTS,
    payload: { sortBy }
});
