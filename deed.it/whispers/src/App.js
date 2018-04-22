import React, { Component, createRef } from 'react';
import './App.css';

const tongueTwisters = {
  'shells': 'She sells sea shells on the sea shore',
  'rascal': 'Round the rugged rock the ragged rascal ran',
  'sheiks': 'Six sick sheiks sitting stitching sheets'
};

class App extends Component {

  constructor (props) {
    super(props);
    this.phraseInput = createRef();
    this.state = {};
    this.renderOption = this.renderOption.bind(this);
    this.send = this.send.bind(this);
  }

  renderOption (id) {
    const optionChosen = (event) => {
      const phrase = tongueTwisters[event.target.id];
      this.setState({...this.state, phrase});
    };
    return (
      <div>
        <input type='radio' id={id} key={id} onChange={optionChosen} />
        <label htmlFor={id}>{tongueTwisters[id]}</label>
      </div>
    );
  }

  send () {
    alert (`Phrase selected ${this.state.phrase}`);
  }

  render() {
    const options = Object.keys(tongueTwisters).map(this.renderOption);
    const manualOptionSelected = () => {
      this.setState({...this.state, phrase: this.state.manualPhrase});
    };
    const setManualPhrase = () => {
      const manualPhrase = this.phraseInput.current.value;
      this.setState({...this.state, manualPhrase});
    };
    const button = this.state.phrase ? (<button onClick={this.send}>Send</button>) : null;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AWSome Chinese Whispers</h1>
        </header>
        <p className="App-intro">
          Select a phrase or enter one:
        </p>
        <fieldset>
          {options}
          <div>
            <input type='radio' id='manual' key='manual' onChange={manualOptionSelected} />
            <label htmlFor='manual'>Enter your own phrase:</label> 
            <input type='text' ref={this.phraseInput} onChange={setManualPhrase} />
          </div>
        </fieldset>
      {button}
      </div>
    );
  }
}

export default App;
