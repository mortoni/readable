import * as ReadableAPI from "../api/ReadableAPI";
import {
    GET_POSTS,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
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
    CLOSE_MODAL,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    EDIT_POST,
    EDIT_COMMENT
} from "./actionTypes";

export function openModal(modal, object, parentId) {
    return dispatch => {
        dispatch({ type: OPEN_MODAL, modal, object, parentId })
    };
}

export function closeModal(modal) {
    return dispatch => {
        dispatch({ type: CLOSE_MODAL, modal })
    };
}

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

export function orderBy(order) {
    return dispatch => {
        dispatch({ type: ORDER_BY, order })
    };
}

export function deletePost(id) {
    return dispatch => {
        ReadableAPI.deletePost(id).then(posts =>
            dispatch({ type: DELETE_POST, id })
        );
    };
}

export function upVotePost(postID) {
    return dispatch => {
        ReadableAPI.upVotePost(postID).then(post =>
            dispatch({ type: UP_VOTE_POST, post })
        );
    };
}

export function downVotePost(postID) {
    return dispatch => {
        ReadableAPI.downVotePost(postID).then(post =>
            dispatch({ type: DOWN_VOTE_POST, post })
        );
    };
}

export function upVoteComment(commentID) {
    return dispatch => {
        ReadableAPI.upVoteComment(commentID).then(comment =>
            dispatch({ type: UP_VOTE_COMMENT, comment })
        );
    };
}

export function downVoteComment(commentID) {
    return dispatch => {
        ReadableAPI.downVoteComment(commentID).then(comment =>
            dispatch({ type: DOWN_VOTE_COMMENT, comment })
        );
    };
}

export function addComment(comment) {
    return dispatch => {
        const modal = 'comment'
        ReadableAPI.addComment(comment).then(comment => {
            dispatch({ type: ADD_COMMENT, comment })
            dispatch({ type: CLOSE_MODAL, modal })
        });
    };
}

export function loadingCategory() {
    return dispatch => {
        dispatch({ type: LOADING_CATEGORY })
    };
}

export function categoryLoaded(status, category) {
    return dispatch => {
        dispatch({ type: CATEGORY_LOADED, status, category })
    };
}

export function setSelected(who, object) {
    return dispatch => {
        dispatch({ type: SET_SELECTED, who, object })
    };
}

export function addPost(post) {
  return dispatch => {
    ReadableAPI.addPost(post).then(newPost =>
      dispatch({ type: ADD_POST, newPost })
    );
  };
}

export function deleteComment(commentID) {
    return dispatch => {
        ReadableAPI.deleteComment(commentID).then(comment =>
            dispatch({ type: DELETE_COMMENT, comment })
        );
    };
}

export function editPost(post) {
    return dispatch => {
        ReadableAPI.editPost(post).then(editedPost => {
            const who = 'post'
            const object = {}
            dispatch({ type: EDIT_POST, editedPost })
            dispatch({ type: SET_SELECTED, who, object })
        });
    };
}

export function editComment(comment) {
    return dispatch => {
        const modal = 'comment'
        ReadableAPI.editComment(comment).then(editedComment => {
            dispatch({ type: EDIT_COMMENT, editedComment })
            dispatch({ type: CLOSE_MODAL, modal })
        });
    };
}

export function getCategories() {
    return dispatch => {
        ReadableAPI.getCategories().then(categories =>
            dispatch({ type: GET_CATEGORIES, categories })
        );
    };
}
