import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import 'antd/dist/antd.css'
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import * as serviceWorker from './serviceWorker';

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));


serviceWorker.unregister();
