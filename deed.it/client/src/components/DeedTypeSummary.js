import React, {Component } from 'react';
import Button from './Button';
import Image from './Image';
import ProgressBar from './ProgressBar';
import Text from './Text';
import './DeedTypeSummary.css';

const hardcoded = {
  date: 'Monday 6th',
  month: 'August 2018',
  time: '22:00',
  address: 'George Street',
  town: 'Edinburgh'
}

class DeedTypeSummary extends Component {

  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      progress: null
    };
  }

  onClick () {
    const { onClick } = this.props;
    this.setState({
      ...this.state,
      progress: {
        duration: 3000,
        text: 'Assigning deed to you...'
      }
    });
    onClick();
  }

  render () {
    const { date, month, time, address, town } = hardcoded;
    const { onClick, props, state } = this;
    const { buttonText, className, deedType, hideButton, key, imageProps } = props;
    const { progress } = state;
    const { description, id, style } = deedType;
    const { color, icon } = style;
    const textStyle = { color };
    const mergedImageProps = {
      className: 'DeedTypeSummary-image',
      src: icon,
      ...imageProps,
    };
    const button = (hideButton)
      ? null
      : <Button text={buttonText} onClick={onClick}/>;
    const progressBar = (progress)
      ? (<ProgressBar {...progress} color= 'white' />)
      : null;
    return (
      <div className={className} key={key}>
        <div className='DeedTypeSummary-image'>
          <Image { ...mergedImageProps } />
        </div>
        <Text text={id} className='DeedTypeSummary-1-line'/>
        <Text text={description} className='DeedTypeSummary-2-lines'/>
        <div className='DeedTypeSummary-callout'>
          <div className='DeedTypeSummary-when flexContainerRow'>
            <Text text='When' className='DeedTypeSummary-callout-text DeedTypeSummary-vertical' style={textStyle}/>
            <div>
              <Text text={date} className='DeedTypeSummary-callout-text DeedTypeSummary-emphasis'/>
              <Text text={month} className='DeedTypeSummary-callout-text'/>
            </div>
            <Text text={time} className='DeedTypeSummary-callout-text DeedTypeSummary-time'/>
          </div>
          <div className='DeedTypeSummary-where flexContainerRow'>
            <Text text='Where' className='DeedTypeSummary-callout-text DeedTypeSummary-vertical' style={textStyle}/>
            <div>
              <Text text={address} className='DeedTypeSummary-callout-text DeedTypeSummary-emphasis'/>
              <Text text={town} className='DeedTypeSummary-callout-text'/>
            </div>
          </div>
        </div>
        {button}
        {progressBar}
      </div>
    );
  }
}

export default DeedTypeSummary;
