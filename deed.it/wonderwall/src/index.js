import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WonderWall from './WonderWall';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WonderWall />, document.getElementById('root'));
registerServiceWorker();
