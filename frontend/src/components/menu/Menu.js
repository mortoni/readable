import { setSelected, orderBy } from '../../actions'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import classNames from 'classnames'

const allPost = (props) => {
    const { selected, setSelected } = props
    let buttonClasses = classNames(
        'button',
        { 'selected': !selected.category.name }
    );

    return (
        <div className="col-6 col-md-2">
            <div className={ buttonClasses }
                 onClick={ () => setSelected('category', { path: '' }) }>
                 All posts
            </div>
        </div>
    )
}

const OrderPost = ({ order, orderBy, toggleOrder }) => {
    return (
        <div className="col-6 col-md-2">
            <div className="button"
                 onClick={ () => {
                     orderBy(order)
                     toggleOrder()
                    }
                 }>

                 <i className="fa fa-sort" aria-hidden="true"></i>

                 { order ?
                     <span> Recent </span> :
                     <span> Score </span>
                 }
            </div>
        </div>
    )
}



class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order: false
        }
    }

    toggleOrder = () => {
        this.setState({ order: !this.state.order })
    }

    render() {
        const { orderBy } = this.props
        const { order } = this.state

        return (
            <div className="cp-menu row">
                { allPost(this.props) }

                <OrderPost
                    order={ order }
                    orderBy={ orderBy }
                    toggleOrder={ this.toggleOrder }
                />
            </div>
        )
    }
}

Menu.propTypes = {
};

function mapStateToProps({ selected }) {
    return {
        selected
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSelected: (who, object) => dispatch(setSelected(who, object)),
        orderBy: (order) => dispatch(orderBy(order)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
