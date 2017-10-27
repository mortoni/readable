import { connect } from 'react-redux'
import { deletePost,
         setSelected,
         openModal,
         getCategories } from '../../../actions'
import { getTime } from '../../../utils/util'
import { Button } from '../../template/Template'
import Comments from '../../comment/Comment'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Details of select post component.
 */
const PostDetails = (props) => {
    const { post,
            deletePost,
            openModal,
            categories } = props

    const category = categories
                        .allCategories
                        .find(category => category.path === post.category)

    return (
        <div className="row cp-post-details">
            <div className="col-8">
                <div className="details">
                    <div className="col-12">
                        <img src={ category.icon }
                             alt="Category Icon"
                             className="img-fluid shadow"
                             width="50"/>
                    </div>

                    <div className="col-12">
                        <span className="title">{ post.title }</span>
                    </div>

                    <div className="col-12">
                        <span>{ post.body }</span>
                    </div>

                    <div className="col-12">
                        <span className="text-uppercase author">
                            Post created by  { post.author + " " + getTime(post.timestamp)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-4 menu text-center">

                <div className="row">
                    <div className="col-12 col-sm-6 mb-3"
                        onClick={() => deletePost(post.id) }>
                        <Button icon='fa fa-trash-o' />
                    </div>

                    <div className="col-12 col-sm-6 mb-3"
                        onClick={ () => openModal('post', post, post.id) }>
                        <Button icon='fa fa-pencil' />
                    </div>
                </div>

                <div className="col item"
                    onClick={ () => openModal('comment', {}, post.id) }>
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                </div>
            </div>

            <div className="col-12 comments-content">
                <Comments post={ post }/>
            </div>
        </div>
    )
}

PostDetails.propTypes = {
    openModal: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    setSelected: PropTypes.func
};

function mapStateToProps({ load, posts, categories }) {
    return {
        load,
        posts,
        categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deletePost: (id) => {
            dispatch(deletePost(id))
            dispatch(setSelected('post', {}))
        },
        openModal: (modal, target, parentId) => dispatch(openModal(modal, target, parentId)),
        getCategories: () => dispatch(getCategories()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
