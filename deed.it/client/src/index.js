import React from 'react';
import ReactDOM from 'react-dom';
import App from './core/App';
import registerServiceWorker from './core/registerServiceWorker';
import { createLocalUser, getLocalUser } from './data/user';
import { getDeedHierarchy, getUserDeeds } from './data/deeds';

const initUser = () => {
  try {
    const user = getLocalUser();
    if (user.nickname) {
      getUserDeeds(user);
    }
  } catch (err) {
    createLocalUser();
  }
};

getDeedHierarchy();
initUser();
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

