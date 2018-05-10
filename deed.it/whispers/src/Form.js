import React, { Component, createRef } from 'react';
// import './global.css';

const tongueTwisters = {
  'shells': 'She sells sea shells on the sea shore',
  'rascal': 'Round the rugged rock the ragged rascal ran',
  'sheiks': 'Six sick sheiks sitting stitching sheets'
};

class Form extends Component {

  constructor (props) {
    super(props);
    const { iterations, phrase } = props;
    this.phraseInput = createRef();
    this.state = {
      iterations,
      phrase,
      manualDisabled: 'disabled',
      manualPhrase: undefined
    };
    this.renderIterations = this.renderIterations.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderManualOption = this.renderManualOption.bind(this);
  }

  renderOption (id) {
    const optionChosen = (event) => {
      this.phraseInput.current.enables = false;
      const phrase = tongueTwisters[event.target.id];
      this.setState({
        ...this.state,
        manualDisabled: 'disabled',
        phrase});
    };
    return (
      <div key={id}>
        <input type='radio' name='option' id={id} onChange={optionChosen} />
        <label htmlFor={id}>{tongueTwisters[id]}</label>
      </div>
    );
  }

  renderManualOption () {
    const selectManualOption = () => {
      this.phraseInput.current.enabled = true;
      this.setState({
        ...this.state,
        manualDisabled: '',
        phrase: this.state.manualPhrase});
    };
    const setManualPhrase = () => {
      const phrase = this.phraseInput.current.value;
      this.setState({
        ...this.state, 
        phrase,
        manualPhrase: phrase});
    };
    return (
      <div key='manual'>
        <input type='radio' name='option' id='manual' onChange={selectManualOption} />
        <label htmlFor='manual'>Enter your own phrase:</label> 
        <input type='text' ref={this.phraseInput} disabled={this.state.manualDisabled} onChange={setManualPhrase} />
      </div>
    );
  }

  renderIterations () {
    const setIterations = (event) => {
      this.setState({...this.state, iterations: event.target.value});
    }
    return (
      <div>
        <label htmlFor='iterations'>How many iterations:</label>
        <input id='iterations' list='tickmarks' type='number' min='1' value={this.state.iterations} max='100' onChange={setIterations} />
      </div>
    );
  }

  render() {
    const options = Object.keys(tongueTwisters).map(this.renderOption);
    const manualOption = this.renderManualOption();
    const iterations = this.renderIterations();
    const send = () => {
      this.props.submit(this.state.iterations, this.state.phrase);
    };
    const button = this.state.phrase ? (<button onClick={send}>Send</button>) : null;
    return (
      <div className="App">
        <h1>AWSome Chinese Whispers</h1>
        <p>Select a phrase or enter one:</p>
        {options}
        {manualOption}
        {iterations}
        {button}
      </div>
    );
  }
}

export default Form;
