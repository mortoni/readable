import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import React, { Component } from 'react'
import { images } from '../../utils/util'
import classNames from 'classnames'

class ModalPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            _title: '',
            _body: '',
            _author: '',
            _category: ''
        }
    }

    onTitleChange = (e) => {
        this.setState({ _title: e.target.value })
    }

    onBodyChange = (e) => {
        this.setState({ _body: e.target.value })
    }

    onAuthorChange = (e) => {
        this.setState({ _author: e.target.value })
    }

    setSelected(selected) {
        this.setState({ _category: selected })
    }

    setClass(current) {
        let flag = false

        if(current.code === this.state._category){
            flag = true
        }

        return classNames(
            'card',
            { 'selected': flag }
        );
    }

    render() {
        const { _title, _body, _author } = this.state
        const { modal, toggle } = this.props

        return (
            <Modal isOpen={ modal } toggle={ toggle } className="cp-modal">
                <ModalHeader toggle={ toggle }>Create Post</ModalHeader>

                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                value={ _title }
                                onChange={ this.onTitleChange }/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="body">Body</Label>
                            <Input
                                type="text"
                                id="body"
                                value={ _body }
                                onChange={ this.onBodyChange }/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input
                                type="text"
                                id="author"
                                value={ _author }
                                onChange={ this.onAuthorChange }/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="author">Category</Label>
                            <div className="container">
                                <div className="row">
                                    {images.map(image => (
                                        <div key={ image.code } className="col"
                                            onClick={ () => {this.setSelected(image.code)}}>
                                            <div className={ this.setClass(image) }>
                                                <div className="d-flex h-100">
                                                    <div className="align-self-center mx-auto">
                                                        <img src={ image.icon }
                                                             alt="Category Figure"
                                                             className="img-fluid"
                                                             width="70"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <div className="row">
                        <div className="button mr-4">
                            Create
                        </div>

                        <div className="button mr-4" onClick={ toggle }>
                            Cancel
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalPost
