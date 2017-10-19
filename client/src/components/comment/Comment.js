import { getTime } from '../../utils/util'
import { upVoteComment,
         downVoteComment,
         deleteComment,
         openModal } from '../../actions'
import { connect } from 'react-redux'
import { Button } from '../template/Template'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Will instantiate every comment in comments of specific post
 */
const Comments = (props) => {
    const { upVoteComment, downVoteComment, deleteComment, openModal } = props
    const post = props.posts.allPosts.find(post => post.id === props.post.id) //arumar isso aqui

    return (
        <div className="cp-comments">
            { post.comments && post.comments.map(comment => (
                <div key={ comment.id } className="card">
                    <div className="col">
                        <span className="badge badge-secondary float-right">{ comment.voteScore }</span>

                        <span>{comment.body}</span>

                        <div className="col text-uppercase author">
                            <span>commented by { comment.author } { getTime(comment.timestamp) }</span>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col" onClick={ () => upVoteComment(comment.id) }>
                            <Button icon='fa fa-thumbs-up'/>
                        </div>

                        <div className="col" onClick={ () => downVoteComment(comment.id) }>
                            <Button icon='fa fa-thumbs-down'/>
                        </div>

                        <div className="col" onClick={ () => openModal('comment', comment, comment.parentId) }>
                            <Button icon='fa fa-pencil'/>
                        </div>

                        <div className="col"  onClick={ () => deleteComment(comment.id) }>
                            <Button icon='fa fa-trash-o'/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

Comments.propTypes = {
    post: PropTypes.object.isRequired,
    upVoteComment: PropTypes.func.isRequired,
    downVoteComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};

function mapStateToProps({ posts }) {
    return {
        posts,
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
