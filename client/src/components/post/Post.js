import { HashLoader } from 'react-spinners'
import { images, getTime } from '../../utils/util'
import { connect } from 'react-redux'
import { setSelected } from '../../actions'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const isSelected = (post, selected) => {
    return post.id === selected.post.id
}

const getPost = (post, selected, setSelected) => {
    const path = images.find(image => image.code === post.category)

    let postClasses = classNames(
        'card',
        'col-xs-12',
        { 'selected': isSelected(post, selected) }
    );

    return(
        <div className={ postClasses } onClick={ () => setSelected('post', post) }>
            <div className="container">
                <div className="row">

                    <div className="col-3">
                        { path && <img src={ path.icon }
                             alt="Category Icon"
                             width="50"
                             className="img-fluid"/>
                         }
                    </div>

                    <div className="col-7">
                        <div className="row text-truncate">
                            { post.title }
                        </div>
                        <div className="row text-nowrap">
                            <span className="colorful">By &nbsp;</span>
                            <span> { post.author } &nbsp;</span>
                            <span className="colorful d-none d-md-block"> { getTime(post.timestamp) } </span>
                        </div>
                    </div>

                    <div className="col-2">
                        <span className="badge badge-secondary float-right">{ post.voteScore }</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

const Post = (props) => {
    const { load, post, selected, setSelected } = props

    return (
        <div className="cp-post">
            { load[post.category] ?
                <div className="d-flex h-100">
                    <div className="justify-content-center align-self-center mx-auto d-block ">
                        <HashLoader
                          color={'#02B3E4'}
                          loading={ load[post.category] }
                        />
                    </div>
                </div>:
                getPost(post, selected, setSelected)
            }
        </div>
    )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

function mapStateToProps({ load, selected }) {
    return {
        load: load,
        selected: selected
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSelected: (who, object) => dispatch(setSelected(who, object)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
