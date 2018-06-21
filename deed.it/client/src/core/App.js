import React, { Component } from 'react';
import { postData } from '../data/fetchWrapper';
import './App.css';
import './global.css';

const methods = ['renderError', 'logError'];

class App extends Component {

  constructor(props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = { error: null };
  }

  componentDidCatch(error, info) {
    console.log( `App error caught: ${error} : ${info}`);
    this.logError(error, info);
    this.setState({ error });
  }

  async logError(error, info) {
    try {
      const body = (error.message, info, navigator.userAgent);
      await postData('deeditLogError', body);
    } catch (err) {
      console.log( `Error logging error ${err}`);
    }
  }

  renderError () {
    return (
      <div className='App-error-container'>
        <div className='App-error-title'>Sad face :-(</div>
        <div className='App-error-msg'>Oh dear, your Deedit app has errored.</div>
        <div className='App-error-msg'>We are sorry.</div>
        <div className='App-error-msg'>Please refresh your browser tab to try again.</div>
      </div>
    );
  }

  render () {
    const { Pages } = this.props;
    const { error } = this.state;
    return (error) ? this.renderError() : (<Pages />);
  }
}

export default App;
