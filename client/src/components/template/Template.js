import React from 'react'
import PropTypes from 'prop-types'

/**
 * Button template component
 */
export const Button = (props) => {
    const { icon } = props

    return(
        <div className="button">
            <div className="col-12">
                <i className={ icon } aria-hidden="true"></i>
            </div>
        </div>
    )
}

Button.propTypes = {
  icon: PropTypes.string.isRequired
};
