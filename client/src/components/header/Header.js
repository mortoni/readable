import React from 'react'
import logo from '../../assets/udacity.svg'

const Header = () => {
    return (
        <div className="cp-header">
            <div className="col-12 text-center">
                <img src={ logo }
                     alt="Udacity logo"
                     className="logo shadow"
                     height="42" width="42"/>

                <span className="float-right author"> @Alan Mortoni</span>
            </div>
        </div>
    )
}

export default Header;
