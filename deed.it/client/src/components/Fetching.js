import React, { Component } from 'react';
import Circular from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Text from './Text';
import './Fetching.css';
import { DefaultProgress } from "./FetchingProgress";

class Fetching extends Component {

  constructor(props) {
    super(props);
    this.setProgress = this.setProgress.bind(this);
    this.state = {
      percentage: 0,
      text: props.text ? props.text : 'Fetching...'
    };
    const progress = (props.progress) ? props.progress: new DefaultProgress();
    progress.setProgress = this.setProgress;
  }

  setProgress(percentage, text) {
    this.setState({
      percentage,
      text: (text) ? text : this.state.text
    });
  }

  render() {
    const { className } = this.props;
    const { percentage, text } = this.state;
    const containerClass = (className) ? `Fetching-container ${className}` : 'Fetching-container';
    return (
      <div className={containerClass} >
        <Circular percentage={percentage} className='Fetching-progress'/>
        <Text text={text} className='Fetching-text'/>
      </div>
    );
  }
}

export default Fetching;
