import { Switch, Route, Router } from 'react-router-dom'
import Home from '../home/Home'
import React from 'react'
import createHistory from 'history/createBrowserHistory'

import '../../styles/Application.css'

/**
 * Router
 */
const history = createHistory();
const Main = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={ Home } />
        </Switch>
    </Router>
);

export default Main;
