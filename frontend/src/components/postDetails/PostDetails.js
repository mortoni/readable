import { connect } from 'react-redux'
import { images, getTime } from '../../utils/util'
import React from 'react'

const PostDetails = (props) => {
    const { post } = props
    const path = images.find(image => image.code === post.category)

    return (
        <div className="row cp-post-details">
            <div className="col-8">
                <div className="details">
                    <div className="col-12">
                        <img src={ path.icon }
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
                        <span className="text-uppercase author">Post created by  { post.author + " " + getTime(post.timestamp)} </span>
                    </div>
                </div>
            </div>

            <div className="col-4 menu">

                <div className="row">
                    <div className="col-12 col-sm-6 ">
                        <div className="col-12 item colored">
                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
                        <div className="col-12 item colored">
                            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>


                <div className="col item">
                    delete
                </div>

                <div className="col item">
                    Edit
                </div>

                <div className="col item">
                    Comment
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({ load }) {
    return {
        load: load,
    };
}

export default connect(mapStateToProps)(PostDetails);
