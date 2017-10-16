import { reducer as formReducer } from 'redux-form'
import { combineReducers } from "redux"
import {
    GET_POSTS,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    VOTE_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_CATEGORIES,
    ADD_POST,
    LOADING_CATEGORY,
    CATEGORY_LOADED,
    SET_SELECTED,
    ORDER_BY,
    DELETE_POST
} from "../actions";

const loadState = {
    ember: false,
    angular: false,
    react: false,
    laravel: false
}

const select = {
    category: {
        path: ''
    },
    post: {}
}

function selected(state = select, action) {
    const { who, object } = action

    switch (action.type) {
        case SET_SELECTED:
            return {
                ...state,
                [who]: object
            };

        default:
            return { ...state };
    }
}

function load(state = loadState, action) {
    const { status, category } = action

    switch (action.type) {
        case LOADING_CATEGORY:
            return {
                ...state,
                ember: true,
                angular: true,
                react: true,
                laravel: true
            };

        case CATEGORY_LOADED:
            return {
                ...state,
                [category]: status
            };

        default:
            return { ...state };
    }
}

function posts(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                allPosts: action.posts.sort((a, b) => a.voteScore < b.voteScore)
            };

        case DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post.id !== action.id)
            }

        case UP_VOTE_POST:
            return {
                ...state,
                allPosts: state.allPosts
                            .filter(post => post.id !== action.post.id)
                            .concat([action.post])
            };
        case DOWN_VOTE_POST:
            return {
                ...state,
                allPosts: state.allPosts
                            .filter(post => post.id !== action.post.id)
                            .concat([action.post])
            };

        case ADD_POST:
            return {
                ...state,
                addedPost: action.newPost,
                allPosts: state.allPosts.concat([action.newPost])
            }

        case ORDER_BY:
            return {
                ...state,
                allPosts: action.order ?
                    state.allPosts.sort((a, b) => a.voteScore < b.voteScore) :
                    state.allPosts.sort((a, b) => a.timestamp < b.timestamp)
            }

        default:
            return { ...state };
    }
}

function comments(state = {}, action) {
    switch (action.type) {
        case VOTE_COMMENT:
            return {
                ...state,
                updatedComment: action.comment
            };

        case ADD_COMMENT:
            return {
                ...state,
                addedComment: action.comment
            };

        case DELETE_COMMENT:
            return {
                ...state,
                deletedComment: action.comment
            };

        default:
            return { ...state };
    }
}

function categories(state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                allCategories: action.categories.categories
            };

        default:
            return { ...state };
    }
}

export default combineReducers({
    posts,
    comments,
    categories,
    load,
    selected,
    form: formReducer
});
