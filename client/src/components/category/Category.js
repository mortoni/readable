import React, { Component } from 'react'
import { HashLoader } from 'react-spinners'
import { getRandom, images } from '../../utils/util'
import { categoryLoaded, setSelected } from '../../actions'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const GetImage = (categoryPath) => {
    const path = images.find(image => image.code === categoryPath)

    return (
        <div className="d-flex h-100">
            <div className="justify-content-center align-self-center mx-auto d-block">
                <img src={ path.image }
                     alt="Category Figure"
                     className="img-fluid d-none d-sm-block"
                     width="170"/>

                 <img src={ path.icon }
                      alt="Category Figure"
                      className="img-fluid d-sm-none"
                      width="70"/>

            </div>
        </div>
    )
}

class Category extends Component {
    componentDidMount() {  //melhorar tirar o didmount
        setTimeout(() => {
            this.props.categoryLoaded(false, this.props.category.path)
        }, getRandom(2000, 5000));
    }

    isSelected() {
        return this.props.category.path === this.props.selected.category.path
    }

    render() {
        const { setSelected, category, load } = this.props
        let cardClasses = classNames(
            'card',
            { 'selected': this.isSelected() }
        );

        return (
            <div className="cp-category">
                <div className={ cardClasses }
                     onClick={ () => {
                         setSelected('category', category)
                         setSelected('post', {}) }
                     }>
                    { load[category.path] ?
                        <div className="d-flex h-100">
                            <div className="justify-content-center align-self-center mx-auto d-block ">
                                <HashLoader
                                  color={'#f95c3c'}
                                  loading={ load[category.path] }
                                />
                            </div>
                        </div> :
                        GetImage(category.path)
                    }
                </div>
            </div>
        )
    }
}

Category.propTypes = {
  category: PropTypes.object.isRequired
};

function mapStateToProps({ load, selected, categories }) {
    return {
        load: load,
        selected: selected
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoryLoaded: (status, category) => dispatch(categoryLoaded(status, category)),
        setSelected: (who, object) => dispatch(setSelected(who, object)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
