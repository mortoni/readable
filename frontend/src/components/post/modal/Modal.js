import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { addPost, closeModal, editPost } from '../../../actions'
import { connect } from 'react-redux'
import { images } from '../../../utils/util'
import classNames from 'classnames'
import uuid from 'uuid'

class PostForm extends Component {

    isSelected = (image) => {
         return classNames(
            'card',
            { 'selected': image.code === this.props.selected }
        );
    }

    componentWillMount() {
        if(this.props.target.id !== undefined) {
            this.props.initialize(this.props.target)
            this.props.setSelected(this.props.target.category)
        }
    }

    render() {
        const { handleSubmit, setSelected, closeModal } = this.props

    return (
        <form onSubmit={ handleSubmit }>
            <div className="row">
                <div className="form-group col-12 col-sm-6">
                    <label htmlFor="title">Title</label>
                    <Field
                        type="text"
                        name="title"
                        component="input"/>
                </div>

                <div className="form-group col-12 col-sm-6">
                    <label htmlFor="author">Author</label>
                    <Field
                        type="text"
                        name="author"
                        component="input"/>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="body">Body</label>
                <Field
                    type="text"
                    name="body"
                    component="textarea"/>
            </div>

            <div className="form-group">
                <label >Category</label>
                <div className="row post-form mb-5">
                    { images.map(image => (
                        <div key={ image.code } className="col" onClick={ () => setSelected(image.code)}>
                            <div className={ this.isSelected(image) }>
                                <div className="d-flex h-100">
                                    <div className="justify-content-center align-self-center mx-auto d-block">
                                        <img src={ image.icon }
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
                    <button type="submit">Create</button>
                </div>

                <div className="float-left">
                    <button type="button" onClick={ () => closeModal('post') }>Cancel</button>
                </div>
            </div>

        </form>
    )
    }
}

PostForm = reduxForm({
  form: 'createPost'
})(PostForm)

class ModalPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }
    }

    // componentDidMount() {
    //   this.handleInitialize();
    // }
    //
    // handleInitialize() {
    //   const test = this.props
    //   const initData = {
    //     "title": this.props,
    //     "author": this.props,
    //     "body": this.props
    //   };
    // }

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
        const { modal, closeModal } = this.props
        const { selected } = this.state



        return (
            <div className="cp-modal">
                <Modal isOpen={ modal.post } toggle={ () => closeModal('post') }>
                    <ModalHeader toggle={ () => closeModal('post') }>
                        Create Post
                    </ModalHeader>

                    <ModalBody>
                        <PostForm
                            onSubmit={ this.submit }
                            selected={ selected }
                            setSelected={ this.setSelected }
                            closeModal={ closeModal }
                            target={ modal.target }/>
                    </ModalBody>

                </Modal>
            </div>

        )
    }
}

function mapStateToProps({ modal }) {
    return {
        modal,
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
