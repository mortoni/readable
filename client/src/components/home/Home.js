import React, { Component } from 'react'
import { getCategories,
         getPosts,
         loadingCategory,
         openModal } from '../../actions'
import { connect } from 'react-redux'
import Category from '../category/Category'
import Post from '../post/Post'
import ModalPost from '../post/modal/Modal'
import ModalComment from '../comment/modal/Modal'
import PostDetails from '../post/details/Details'
import Menu from '../menu/Menu'
import Header from '../header/Header'

/**
 * Main page that will contain all other components
 */
class Home extends Component {
    componentDidMount() {
        this.props.loadingCategory();
        this.props.getCategories();
        this.props.getPosts();
    }

    categories = () => {
        if (this.props.categories.allCategories) { //remover esse if colocar o default state no reducers
            const { allCategories } = this.props.categories;
            const { history } = this.props

            return (
                <div className="row no-gutters">
                    { allCategories.map(category => (
                        <div key={ category.name } className="col-6 col-sm-4 col-md-3 ">
                            <Category category={ category } history={ history }/>
                        </div>
                    )) }
                </div>
            )
        }
    }

    posts = () => {
        if (this.props.posts.allPosts) { // remover esse if
            const { allPosts } = this.props.posts
            const { selected, history } = this.props

            return (
                allPosts
                    .filter(post => post.id !== undefined)
                    .filter(post => selected.category.path === post.category || selected.category.path === '')
                    .map(post => (
                        <Post key={ post.id } post={ post } history={ history }/>
                ))
            )
        }
    }

    render() {
        const { openModal, modal, history, selected } = this.props

        return (
            <div className="section">
            <Header />
            <div className="container">

                <div className="cp-home">
                    {this.categories()}

                    <div className="container mt-3 mb-3">
                        <div className="row">
                            <div className="col-12 ol-sm-6 col-md-5">
                                <Menu history={ history }/>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-5 post-list">
                                {this.posts()}
                            </div>

                            <div className="col-12 col-sm-6 col-md-7 post-details">
                                { selected.post.id &&
                                    <PostDetails post={ selected.post } />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="open-search">
                        <a onClick={ () => openModal('post', {}, null) } >Add a Post</a>
                    </div>

                    <ModalPost modal={ modal.post }/>
                    <ModalComment modal={ modal.comment }/>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps({ categories, posts, selected, modal }) {
    return {
        categories,
        posts,
        selected,
        modal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        loadingCategory: () => dispatch(loadingCategory()),
        getPosts: () => dispatch(getPosts()),
        openModal: (modal, target, parentId) => dispatch(openModal(modal, target, parentId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
