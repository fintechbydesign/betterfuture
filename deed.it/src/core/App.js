import React, { Component } from 'react';
import { getInitialState, selectPage } from './controller.js';
import logo from '../images/mercury.jpeg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = getInitialState();
    this.setState = this.setState.bind(this);
  }

  render() {
    const page = selectPage(this.state, this.setState);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">deed.it</h1>
        </header>
      { page }
      </div>
    );
  }
}

export default App;
