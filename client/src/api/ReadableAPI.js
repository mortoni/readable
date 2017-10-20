const api = "http://localhost:3001";

// let token = localStorage.token;
//
// if (!token) {
//     token = localStorage.token = Math.random().toString(36).substr(-8);
// }



/**
 * Since tests run without the dom (and thus without window.localStorage)
 *  create a storage placeholder only when tests are running to polyfill missing global
 */
let token;
let storage;

if (process.env.NODE_ENV === 'test') {
  token = null;
  storage = { token:  null };
} else {
  token = localStorage.token;
  storage = localStorage;
}




const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};

export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json());

export const addPost = post =>
    fetch(`${api}/posts`, {
        method: "POST",
        headers,
        body: JSON.stringify(post)
    })
        .then(res => res.json())
        .then(data => data);

export const upVotePost = (postID) =>
    fetch(`${api}/posts/${postID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ option: "upVote" })
    })
        .then(res => res.json())
        .catch(error => error);

export const downVotePost = (postID) =>
    fetch(`${api}/posts/${postID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ option: "downVote" })
    })
        .then(res => res.json())
        .catch(error => error);

export const upVoteComment = (commentID) =>
    fetch(`${api}/comments/${commentID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ option: "upVote" })
    })
        .then(res => res.json())
        .catch(error => error);

export const downVoteComment = (commentID) =>
    fetch(`${api}/comments/${commentID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ option: "downVote" })
    })
        .then(res => res.json())
        .catch(error => error);

export const deletePost = postID =>
    fetch(`${api}/posts/${postID}`, {
        method: "DELETE",
        headers
    })
        .then(res => res.json())
        .catch(error => error);

export const getComments = postID =>
    fetch(`${api}/posts/${postID}/comments`, {
        method: "GET",
        headers
    }).then(res => res.json());

export const addComment = comment =>
    fetch(`${api}/comments/`, {
        method: "POST",
        headers,
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .catch(error => error);

export const deleteComment = commentID =>
    fetch(`${api}/comments/${commentID}`, {
        method: "DELETE",
        headers
    })
        .then(res => res.json())
        .catch(error => error);

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .catch(error => error);

export const editPost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(post)
    })
        .then(res => res.json())
        .catch(error => error);

export const editComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .catch(error => error);
