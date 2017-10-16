import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { closeModal, addComment } from '../../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import uuid from 'uuid'

let CommentForm = (props) => {
    const { handleSubmit, closeModal } = props

    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <label htmlFor="body">Body</label>
                <Field
                    type="text"
                    name="body"
                    component="textarea"/>
            </div>

            <div className="form-group">
                <label htmlFor="author">Author</label>
                <Field
                    type="text"
                    name="author"
                    component="input"/>
            </div>

            <div className="col">
                <div className="float-right">
                    <button type="submit">Create</button>
                </div>

                <div className="float-left">
                    <button type="button" onClick={ () => closeModal('post') }>Cancel</button>
                </div>
            </div>

        </form>
    )
}

CommentForm = reduxForm({
  form: 'comment'
})(CommentForm)

const ModalComment = (props) => {
    const { modal, closeModal, addComment } = props

    const submit = (values) => {
        const comment = {
            id: uuid().split("-").join(""),
            timestamp: Date.now(),
            body: values.body,
            author: values.author,
            parentId: modal.parentId
        }

        closeModal('comment')
        addComment(comment)
    }

    return (
        <div className="cp-comment-modal">
            <Modal isOpen={ modal.comment } toggle={ () => closeModal('comment') }>
                <ModalHeader toggle={ () => closeModal('comment') }>
                    Create Comment
                </ModalHeader>

                <ModalBody>
                    <CommentForm
                        onSubmit={ submit }
                        closeModal={ closeModal }/>
                </ModalBody>

            </Modal>
        </div>

    )
}

function mapStateToProps({ modal }) {
    return {
        modal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeModal: (modal) => dispatch(closeModal(modal)),
        addComment: (comment) => dispatch(addComment(comment))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComment);
