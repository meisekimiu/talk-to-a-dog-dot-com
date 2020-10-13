import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {DogHeader} from "./components/DogHeader";
import {ChatBox} from "./components/ChatBox";
import {Footer} from "./components/Footer";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <DogHeader />
    <ChatBox />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
