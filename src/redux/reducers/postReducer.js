import { combineReducers } from 'redux';
import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    ADD_POST,
    DELETE_POST,
    SEARCH_POSTS,
    SORT_POSTS
} from '../actions/postActions';

const posts = (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return action.payload.posts;
        case ADD_POST:
            return [...state, action.payload.post];
        case DELETE_POST:
            return state.filter(post => post.id !== action.payload.id);
        case SEARCH_POSTS:
            return state.filter(post =>
                post.title.includes(action.payload.searchQuery) ||
                post.body.includes(action.payload.searchQuery)
            );
        case SORT_POSTS:
            return state.slice().sort((a, b) => {
                if (a[action.payload.sortBy] < b[action.payload.sortBy]) {
                    return -1;
                }
                if (a[action.payload.sortBy] > b[action.payload.sortBy]) {
                    return 1;
                }
                return 0;
            });
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_POSTS_FAILURE:
            return action.payload.error;
        default:
            return state;
    }
};

export default combineReducers({
    posts,
    error
});
