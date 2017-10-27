import React, { Component } from 'react'
import { HashLoader } from 'react-spinners'
import { getRandom } from '../../utils/util'
import { categoryLoaded, setSelected } from '../../actions'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

/**
 * Will mount images for desktop and mobile for each category.
 */
const GetImage = (category) => {
    return (
        <div className="d-flex h-100">
            <div className="align-self-center mx-auto">
                <img src={ category.image }
                     alt="Category Figure"
                     className="img-fluid d-none d-sm-block"
                     width="170"/>

                 <img src={ category.icon }
                      alt="Category Figure"
                      className="img-fluid d-sm-none"
                      width="70"/>
            </div>
        </div>
    )
}

/**
 * Will instantiate every category in categories coming from server.
 */
class Category extends Component {
    componentDidMount() {  //melhorar tirar o didmount
        setTimeout(() => {
            this.props.categoryLoaded(false, this.props.category.path)
        }, getRandom(2000, 5000));
    }

    isSelected() {
        return this.props.category.path === this.props.selected.category.path
    }

    goTo() {
        const category = this.props.category.path
        this.props.history.push(`/${category}`)
    }

    render() {
        const { setSelected, category, load, history } = this.props
        let cardClasses = classNames(
            'card',
            { 'selected': this.isSelected() }
        );

        return (
            <div className="cp-category">
                <div className={ cardClasses }
                     onClick={ () => {
                         setSelected('category', category)
                         setSelected('post', {})
                         this.goTo()
                        }
                     }>
                    { load[category.path] ?
                        <div className="d-flex h-100">
                            <div className="align-self-center mx-auto">
                                <HashLoader
                                    color={'#f95c3c'}
                                    loading={ load[category.path] }
                                />
                            </div>
                        </div> :
                        GetImage(category, history)
                    }
                </div>
            </div>
        )
    }
}

Category.propTypes = {
    category: PropTypes.object.isRequired,
    categoryLoaded: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
};

function mapStateToProps({ load, selected, categories }) {
    return {
        load,
        selected,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoryLoaded: (status, category) => dispatch(categoryLoaded(status, category)),
        setSelected: (who, object) => dispatch(setSelected(who, object)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
