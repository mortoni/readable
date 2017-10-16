import * as ReadableAPI from "../api/ReadableAPI";

export const OPEN_MODAL = "OPEN_MODAL";
export function openModal(modal, object, parentId) {
    return dispatch => {
        dispatch({ type: OPEN_MODAL, modal, object, parentId })
    };
}

export const CLOSE_MODAL = "CLOSE_MODAL";
export function closeModal(modal) {
    return dispatch => {
        dispatch({ type: CLOSE_MODAL, modal })
    };
}

export const GET_POSTS = "GET_POSTS";
export function getPosts() {
    return dispatch => {
        ReadableAPI
            .getPosts()
            .then(posts =>
                Promise.all(
                    posts.map(post =>
                        ReadableAPI
                            .getComments(post.id)
                            .then(comments => post.comments = comments)
                            .then(() => post)
                    )
                )
            )
            .then(posts =>
                dispatch({ type: GET_POSTS, posts })
            );
    };
}

export const ORDER_BY = "ORDER_BY";
export function orderBy(order) {
    return dispatch => {
        dispatch({ type: ORDER_BY, order })
    };
}

export const DELETE_POST = "DELETE_POST";
export function deletePost(id) {
    return dispatch => {
        ReadableAPI.deletePost(id).then(posts =>
            dispatch({ type: DELETE_POST, id })
        );
    };
}

export const UP_VOTE_POST = "UP_VOTE_POST";
export function upVotePost(postID) {
    return dispatch => {
        ReadableAPI.upVotePost(postID).then(post =>
            dispatch({ type: UP_VOTE_POST, post })
        );
    };
}

export const DOWN_VOTE_POST = "DOWN_VOTE_POST";
export function downVotePost(postID) {
    return dispatch => {
        ReadableAPI.downVotePost(postID).then(post =>
            dispatch({ type: DOWN_VOTE_POST, post })
        );
    };
}

export const VOTE_COMMENT = "VOTE_COMMENT";
export function voteComment(postID, vote) {
    return dispatch => {
        ReadableAPI.voteComment(postID, vote).then(comment =>
            dispatch({ type: VOTE_COMMENT, comment })
        );
    };
}

export const ADD_COMMENT = "ADD_COMMENT";
export function addComment(comment) {
    return dispatch => {
        ReadableAPI.addComment(comment).then(comment =>
            dispatch({ type: ADD_COMMENT, comment })
        );
    };
}

export const LOADING_CATEGORY = "LOADING_CATEGORY";
export function loadingCategory() {
    return dispatch => {
        dispatch({ type: LOADING_CATEGORY })
    };
}

export const CATEGORY_LOADED = "CATEGORY_LOADED";
export function categoryLoaded(status, category) {
    return dispatch => {
        dispatch({ type: CATEGORY_LOADED, status, category })
    };
}

export const SET_SELECTED = "SET_SELECTED";
export function setSelected(who, object) {
    return dispatch => {
        dispatch({ type: SET_SELECTED, who, object })
    };
}

export const ADD_POST = "ADD_POST";
export function addPost(post) {
  return dispatch => {
    ReadableAPI.addPost(post).then(newPost =>
      dispatch({ type: ADD_POST, newPost })
    );
  };
}

export const DELETE_COMMENT = "DELETE_COMMENT";
export function deleteComment(commentID) {
    return dispatch => {
        ReadableAPI.deleteComment(commentID).then(comment =>
            dispatch({ type: DELETE_COMMENT, comment })
        );
    };
}

export const GET_CATEGORIES = "GET_CATEGORIES";
export function getCategories() {
    return dispatch => {
        ReadableAPI.getCategories().then(categories =>
            dispatch({ type: GET_CATEGORIES, categories })
        );
    };
}
