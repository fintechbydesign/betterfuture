import React from 'react';
import ReactDOM from 'react-dom';
import App from './core/App';
import registerServiceWorker, { unregister } from './core/registerServiceWorker';

import { createLocalUser, getLocalUser } from './data/user';
import { getDeedHierarchy, getUserDeeds } from './data/deeds';

const asyncWrapper = async(fn) => {
  try {
    await fn();
  } catch (err) {
    console.log(err);
  }
}

const initUser = () => {
  try {
    const user = getLocalUser();
    if (user.nickname) {
      asyncWrapper(getUserDeeds.bind(null, user));
    }
  } catch (err) {
    createLocalUser();
  }
};

const start = async() => {
  getDeedHierarchy();
  initUser();
  const { pages } = await import(/* webpackChunkName: 'pages' */ './pages/pages');
  ReactDOM.render(<App pages={pages} />, document.getElementById('root'));
// registerServiceWorker();
  unregister();
};

start();



