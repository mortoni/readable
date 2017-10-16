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
    DELETE_POST,
    OPEN_MODAL,
    CLOSE_MODAL
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

const modalState = {
    post: false,
    comment: false,
    target: {},
    parentId: null
}

function modal(state = modalState, action) {
    const { modal, object, parentId } = action

    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                [modal]: true,
                target: object,
                parentId
            };
        case CLOSE_MODAL:
            return {
                ...state,
                [modal]: false,
                target: {}
            };
        default:
            return { ...state };
    }
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
    const { comment } = action

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

        case ADD_COMMENT:
            return {
                ...state,
                allPosts: state.allPosts
                            .map(post => {
                                if(post.comments === undefined) {
                                    post.comments = []
                                }

                                if(post.id === comment.parentId) {
                                    return post.comments.concat([comment])
                                }
                                return post
                                //investigar aqui
                            })
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
    categories,
    load,
    selected,
    modal,
    form: formReducer
});
