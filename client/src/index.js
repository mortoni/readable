import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Application.css';
import Main from './components/main/Main';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
