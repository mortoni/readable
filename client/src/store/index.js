import { createStore, applyMiddleware, compose } from "redux"
import {createLogger} from "redux-logger"
import reducer from "../reducers"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
    predicate:(getState, action) => !action.type.includes('@@redux-form')
})

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
