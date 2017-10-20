import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { closeModal, addComment, editComment } from '../../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type}/>
                {touched &&
                    ((error && <span className="text-uppercase erroInput">{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
)

/**
 * Redux form for create / edit comment
 */
class CommentForm extends Component {

    componentWillMount() {
        if(this.props.target.id !== undefined) {
            this.props.initialize(this.props.target)
        }
    }

    render() {
        const { handleSubmit, closeModal, target } = this.props

        const button = target.id ? 'Edit' : 'Create'

        return (
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <Field
                        type="text"
                        name="body"
                        component={renderField}
                        label="Body"/>
                </div>

                <div className="form-group">
                    <Field
                        type="text"
                        name="author"
                        component={renderField}
                        label="Author"/>
                </div>

                <div className="col">
                    <div className="float-right">
                        <button type="submit"> { button } </button>
                    </div>

                    <div className="float-left">
                        <button type="button" onClick={ () => closeModal('comment') }>Cancel</button>
                    </div>
                </div>

            </form>
        )
    }
}

//Post side validation
function validate(values) {
    const errors = {};

    if (!values.body || values.body.trim() === '') {
        errors.body = 'Enter a Body message';
    }

    if(values.body && values.body.length > 50) {
        errors.body = 'Too big, max 50 characters';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Enter an Author';
    }

    if(values.author && values.author.length > 10) {
        errors.author = 'Too big, max 10 characters';
    }

    return errors;
}

CommentForm = reduxForm({
  form: 'comment',
  validate
})(CommentForm)

/**
 * Modal for create / edit comment
 */
const ModalComment = (props) => {
    const { modal, closeModal, addComment, editComment } = props

    const title = modal.target.id ? 'Edit Comment' : 'Create Comment'

    const submit = (values) => {
        const comment = {
            id: values.id || uuid().split("-").join(""),
            timestamp: values.timestamp || Date.now(),
            body: values.body,
            author: values.author,
            parentId: modal.parentId
        }

        if(values.id === undefined) {
            addComment(comment)
        } else {
            editComment(comment)
        }

        closeModal('post')
    }

    return (
        <div className="cp-comment-modal">
            <Modal isOpen={ modal.comment } toggle={ () => closeModal('comment') }>
                <ModalHeader toggle={ () => closeModal('comment') }>
                    { title }
                </ModalHeader>

                <ModalBody>
                    <CommentForm
                        onSubmit={ submit }
                        closeModal={ closeModal }
                        target={ modal.target }/>
                </ModalBody>

            </Modal>
        </div>

    )
}

ModalComment.propTypes = {
    modal: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired
}

function mapStateToProps({ modal }) {
    return {
        modal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeModal: (modal) => dispatch(closeModal(modal)),
        addComment: (comment) => dispatch(addComment(comment)),
        editComment: (comment) => dispatch(editComment(comment)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComment);
