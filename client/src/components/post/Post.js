import { HashLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { setSelected, upVotePost, downVotePost } from '../../actions'
import { Button } from '../template/Template'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'


const isSelected = (post, selected) => {
    return post.id === selected.post.id
}

/**
 * Component to instantiate a post.
 */
const GetPost = ({ post,
                   selected,
                   setSelected,
                   categories,
                   downVotePost,
                   upVotePost,
                   history }) => {

    const category = categories
                        .allCategories
                        .find(category => category.path === post.category)

    let postClasses = classNames(
        'card',
        'col-xs-12',
        { 'selected': isSelected(post, selected) }
    );

    const changeRoute = () => {
        setSelected('post', post)
        history.push(`/${post.category}/${post.id}`, { post })
    }

    return(
        <div className={ postClasses } onClick={ () => changeRoute() }>
            <div className="container">
                <div className="row">

                <div className="col-3">
                    <img src={ category.icon }
                         alt="Category Icon"
                         width="50"
                         className="img-fluid"/>
                </div>

                    <div className="col-9 pl-0 pr-1">
                        <div className="row">
                            <div className="col-10 text-truncate">
                                <span>{ post.title }</span>
                            </div>

                            <div className="col-2">
                                <span className="badge badge-secondary float-right">
                                    { post.voteScore }
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="row mt-2">
                                    <span className="col-4 comment pr-0">
                                        { post.comments.length } comments
                                    </span>

                                    <div className="col-4 text-center"
                                        onClick={() => upVotePost(post.id) }>
                                        <Button icon='fa fa-thumbs-up' />
                                    </div>

                                    <div className="col-4 text-center"
                                        onClick={() => downVotePost(post.id) }>
                                        <Button icon='fa fa-thumbs-down' />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Container of post
 */
const Post = (props) => {
    const { load,
            post,
            selected,
            setSelected,
            categories,
            downVotePost,
            upVotePost,
            history } = props

    return (
        <div className="cp-post">
            { load[post.category] ?
                <div className="d-flex h-100">
                    <div className="align-self-center mx-auto">
                        <HashLoader
                          color={'#02B3E4'}
                          loading={ load[post.category] }
                        />
                    </div>
                </div>
                :
                <GetPost post={ post }
                         selected={ selected }
                         setSelected={ setSelected }
                         categories={ categories }
                         downVotePost={ downVotePost }
                         upVotePost={ upVotePost }
                         history={ history } />
            }
        </div>
    )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  upVotePost: PropTypes.func.isRequired,
  downVotePost: PropTypes.func.isRequired,
};

function mapStateToProps({ load, selected, categories }) {
    return {
        load,
        selected,
        categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSelected: (who, object) => dispatch(setSelected(who, object)),
        upVotePost: (postID) => dispatch(upVotePost(postID)),
        downVotePost: (postID) => dispatch(downVotePost(postID)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
