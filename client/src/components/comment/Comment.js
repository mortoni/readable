import { getTime } from '../../utils/util'
import { upVoteComment, downVoteComment, deleteComment, openModal } from '../../actions'
import { connect } from 'react-redux'
import React from 'react'

const Comments = (props) => {
    const { upVoteComment, downVoteComment, deleteComment, openModal } = props
    const post = props.posts.allPosts.find(post => post.id === props.post.id)

    return (
        <div className="cp-comments">
            { post.comments && post.comments.map(comment => (
                <div key={ comment.id } className="card">
                    <div className="col">
                        <span className="badge badge-secondary float-right">{ comment.voteScore }</span>

                        {comment.body}

                        <div className="col text-uppercase author">
                            <span>commented by { comment.author } { getTime(comment.timestamp) }</span>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <div className="col-12 item" onClick={ () => upVoteComment(comment.id) }>
                                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className="col">
                            <div className="col-12 item" onClick={ () => downVoteComment(comment.id) }>
                                <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className="col">
                            <div className="col-12 item" onClick={ () => openModal('comment', comment, comment.parentId) }>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className="col">
                            <div className="col-12 item" onClick={ () => deleteComment(comment.id) }>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function mapStateToProps({ posts }) {
    return {
        posts: posts || [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        upVoteComment: (commentId) => dispatch(upVoteComment(commentId)),
        downVoteComment: (commentId) => dispatch(downVoteComment(commentId)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        openModal: (modal, target, parentId) => dispatch(openModal(modal, target, parentId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
