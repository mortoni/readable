import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Application.css';
import Main from './components/main/Main';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
      <Main />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
