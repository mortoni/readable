import * as ReadableAPI from "../api/ReadableAPI";

export const GET_POSTS = "GET_POSTS";
export function getPosts() {
    return dispatch => {
        ReadableAPI.getPosts().then(posts =>
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
// export function getPosts() {
//     return dispatch => {
//         ReadableAPI.getPosts()
//         .then(posts =>
//             Promise.all(
//                 posts.map(post =>
//                     ReadableAPI.getComments(post.id)
//                     .then(comments => (post.comments = comments))
//                     .then(() => post)
//                 )
//             )
//         )
//         .then(posts => dispatch({ type: GET_POSTS, posts }));
//     };
// }

export const VOTE_POST = "VOTE_POST";
export function votePost(postID, vote) {
    return dispatch => {
        ReadableAPI.votePost(postID, vote).then(post =>
            dispatch({ type: VOTE_POST, post })
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
