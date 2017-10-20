import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { addPost, closeModal, editPost } from '../../../actions'
import { connect } from 'react-redux'
import classNames from 'classnames'
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
 * Redux form component for create / edit Post.
 */
class PostForm extends Component {

    isSelected = (category) => {
         return classNames(
            'card',
            { 'selected': category.path === this.props.selected }
        );
    }

    componentWillMount() {
        if(this.props.target.id !== undefined) {
            this.props.initialize(this.props.target)
            this.props.setSelected(this.props.target.category)
        }
    }

    required = value => value ? undefined : 'Required'

    render() {
        const { handleSubmit,
                setSelected,
                closeModal,
                target,
                categories } = this.props

        const button = target.id ? 'Edit' : 'Create'

        return (
            <form onSubmit={ handleSubmit }>
                <div className="row">
                    <div className="form-group col-12 col-sm-6">
                        <Field
                            type="text"
                            name="title"
                            component={renderField}
                            label="Title"/>
                    </div>

                    <div className="form-group col-12 col-sm-6">
                        <Field
                            type="text"
                            name="author"
                            component={renderField}
                            label="Author"/>
                    </div>
                </div>

                <div className="form-group">
                    <Field
                        type="text"
                        name="body"
                        component={renderField}
                        label="Body"/>

                </div>

                <div className="form-group">
                    <label >Category</label>
                    <div className="row post-form mb-5">
                        { categories.allCategories.map(category => (
                            <div key={ category.path } className="col"
                                onClick={ () => setSelected(category.path)}>
                                <div className={ this.isSelected(category) }>
                                    <div className="d-flex h-100">
                                        <div className="align-self-center mx-auto">
                                            <img src={ category.icon }
                                                 alt="Category Figure"
                                                 className="img-fluid"
                                                 width="50"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                <div className="col">
                    <div className="float-right">
                        <button type="submit"> { button } </button>
                    </div>

                    <div className="float-left">
                        <button type="button"
                            onClick={ () => closeModal('post') }>Cancel</button>
                    </div>
                </div>

            </form>
        )
    }
}

PostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    target: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
}

//Post side validation
function validate(values) {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter a Title';
    }

    if(values.title && values.title.length > 25) {
        errors.title = 'Too big, max 25 characters';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Enter an Authir';
    }

    if(values.author && values.author.length > 10) {
        errors.author = 'Too big, max 10 characters';
    }

    if(values.body && values.body.length > 50) {
        errors.body = 'Too big, max 50 characters';
    }
    return errors;
}

PostForm = reduxForm({
  form: 'createPost',
  validate
})(PostForm)

/**
 * Modal component for create / edit Post.
 */
class ModalPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }
    }

    setSelected(selected) {
        this.setState(state => ({
            ...state,
            category: selected
        }))
    }

    setClass(current) {
        let flag = false

        if(current.code === this.state.post.category){
            flag = true
        }

        return classNames(
            'card',
            { 'selected': flag }
        );
    }

    submit = (values) => {
        const post = {
            id: values.id || uuid().split("-").join(""),
            timestamp: values.timestamp || Date.now(),
            title: values.title,
            body: values.body,
            author: values.author,
            category: this.state.selected,
            comments: values.comments || []
        }

        if(values.id === undefined) {
            this.props.addPost(post)
        } else {
            this.props.editPost(post)
        }


        this.props.closeModal('post')

    }

    setSelected = (selected) => {
        this.setState({ selected })
    }

    render() {
        const { modal, closeModal, categories } = this.props
        const { selected } = this.state

        const title = modal.target.id ? 'Edit Post' : 'Create Post'

        return (
            <div className="cp-modal">
                <Modal isOpen={ modal.post } toggle={ () => closeModal('post') }>
                    <ModalHeader toggle={ () => closeModal('post') }>
                        { title }
                    </ModalHeader>

                    <ModalBody>
                        <PostForm
                            onSubmit={ this.submit }
                            selected={ selected }
                            setSelected={ this.setSelected }
                            closeModal={ closeModal }
                            target={ modal.target }
                            categories={ categories }/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ModalPost.propTypes = {
    modal: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired
}

function mapStateToProps({ modal, categories }) {
    return {
        modal,
        categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
        closeModal: (modal) => dispatch(closeModal(modal)),
        editPost: (post) => dispatch(editPost(post)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPost);
