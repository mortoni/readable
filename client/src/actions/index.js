import * as ReadableAPI from "../api/ReadableAPI";
import * as actionTypes from "./actionTypes";

/* Categories Action Creators */

export function openModal(modal, object, parentId) {
    return dispatch => {
        dispatch({ type: actionTypes.OPEN_MODAL, modal, object, parentId })
    };
}

export function closeModal(modal) {
    return dispatch => {
        dispatch({ type: actionTypes.CLOSE_MODAL, modal })
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
                dispatch({ type: actionTypes.GET_POSTS, posts })
            );
    };
}

export function orderBy(order) {
    return dispatch => {
        dispatch({ type: actionTypes.ORDER_BY, order })
    };
}

export function deletePost(id) {
    return dispatch => {
        ReadableAPI.deletePost(id).then(posts =>
            dispatch({ type: actionTypes.DELETE_POST, id })
        );
    };
}

export function upVotePost(postID) {
    return dispatch => {
        ReadableAPI.upVotePost(postID).then(post =>
            dispatch({ type: actionTypes.UP_VOTE_POST, post })
        );
    };
}

export function downVotePost(postID) {
    return dispatch => {
        ReadableAPI.downVotePost(postID).then(post =>
            dispatch({ type: actionTypes.DOWN_VOTE_POST, post })
        );
    };
}

export function upVoteComment(commentID) {
    return dispatch => {
        ReadableAPI.upVoteComment(commentID).then(comment =>
            dispatch({ type: actionTypes.UP_VOTE_COMMENT, comment })
        );
    };
}

export function downVoteComment(commentID) {
    return dispatch => {
        ReadableAPI.downVoteComment(commentID).then(comment =>
            dispatch({ type: actionTypes.DOWN_VOTE_COMMENT, comment })
        );
    };
}

export function addComment(comment) {
    return dispatch => {
        const modal = 'comment'
        ReadableAPI.addComment(comment).then(comment => {
            dispatch({ type: actionTypes.ADD_COMMENT, comment })
            dispatch({ type: actionTypes.CLOSE_MODAL, modal })
        });
    };
}

export function loadingCategory() {
    return dispatch => {
        dispatch({ type: actionTypes.LOADING_CATEGORY })
    };
}

export function categoryLoaded(status, category) {
    return dispatch => {
        dispatch({ type: actionTypes.CATEGORY_LOADED, status, category })
    };
}

export function setSelected(who, object) {
    return dispatch => {
        dispatch({ type: actionTypes.SET_SELECTED, who, object })
    };
}

export function addPost(post) {
  return dispatch => {
    ReadableAPI.addPost(post).then(newPost =>
      dispatch({ type: actionTypes.ADD_POST, newPost })
    );
  };
}

export function deleteComment(commentID) {
    return dispatch => {
        ReadableAPI.deleteComment(commentID).then(comment =>
            dispatch({ type: actionTypes.DELETE_COMMENT, comment })
        );
    };
}

export function editPost(post) {
    return dispatch => {
        ReadableAPI.editPost(post).then(editedPost => {
            const who = 'post'
            const object = {}
            dispatch({ type: actionTypes.EDIT_POST, editedPost })
            dispatch({ type: actionTypes.SET_SELECTED, who, object })
        });
    };
}

export function editComment(comment) {
    return dispatch => {
        const modal = 'comment'
        ReadableAPI.editComment(comment).then(editedComment => {
            dispatch({ type: actionTypes.EDIT_COMMENT, editedComment })
            dispatch({ type: actionTypes.CLOSE_MODAL, modal })
        });
    };
}

export function getCategories() {
    return dispatch => {
        ReadableAPI.getCategories().then(categories =>
            dispatch({ type: actionTypes.GET_CATEGORIES, categories })
        );
    };
}
