import React from 'react';
import ReactDOM from 'react-dom';
import App from './core/App';
import { createLocalUser, getLocalUser } from './data/user';
import { getDeedHierarchy, getUserDeeds } from './data/deeds';
import registerServiceWorker from './core/registerServiceWorker';

getDeedHierarchy();
try {
  const user = getLocalUser();
  if (user.username && user.deeds.current) {
    getUserDeeds();
  }
} catch (err) {
  createLocalUser();
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
