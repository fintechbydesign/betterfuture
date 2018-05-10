import React, { Component } from 'react';
import Form from './Form.js';
import Results from './Results.js';
// import './global.css';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = ({
      iterations: 1,
      phrase: undefined,
      showResults: false
    });
    this.showForm = this.showForm.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  showForm () {
    this.setState({
      ...this.state,
      showResults: false
    });
  }

  showResults (iterations, phrase) {
    this.setState({
      ...this.state,
      iterations,
      phrase,
      showResults: true
    });
  }

  render () {
    const { iterations, phrase, showResults } = this.state;
    const submit = showResults ? this.showForm : this.showResults;
    const Component = showResults ? Results : Form;
    return (
      <Component submit={submit} iterations={iterations} phrase={phrase} />
    );
  }
}

export default App;
