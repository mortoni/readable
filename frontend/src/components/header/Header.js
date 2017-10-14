import React from 'react'
import '../../styles/Application.css'
import logo from '../../assets/udacity.svg'

const Header = () => {
    return (
        <div className="cp-header">

            <div className="col-xs-12">
                <div className="col-xs-12 text-center">
                    <img src={ logo }
                         alt="Udacity logo"
                         className="logo shadow"
                         height="42" width="42"/>
                </div>
            </div>
        </div>
    )
}

export default Header;
