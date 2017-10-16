import { getTime } from '../../utils/util'
import React from 'react'

const Comments = (props) => {
    const { post } = props

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
                </div>
            ))}
        </div>
    )
}

export default Comments
