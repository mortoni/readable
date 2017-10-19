import { Route } from 'react-router-dom'
import Header from '../header/Header'
import Home from '../home/Home'
import React from 'react'

import '../../styles/Application.css'

const Main = () => {
    return (
        <section className="section">
            <Header />

            <Route exact path="/"
                render={() => (
                    <div className="container">
                        <Home/>
                    </div>
                )}
            />
            
        </section>
    );
};

export default Main;
