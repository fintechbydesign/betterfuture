import React, {Component } from 'react';
import Button from './Button';
import Image from './Image';
import ProgressBar from './ProgressBar';
import Text from './Text';
import './DeedTypeSummary.css';

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
    const { onClick, props, state } = this;
    const { buttonText, className, deedType, hideButton, key, imageProps } = props;
    const { progress } = state;
    const { description, id, style, where, whereDetails, whereLink, when } = deedType;
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

    let addressDetails = null;
    if (whereDetails) {
      addressDetails = whereLink
        ? (<Text contents={[(<a href={whereLink}>{whereDetails}</a>)]} className='DeedTypeSummary-callout-text' />)
        : (<Text text={whereDetails} className='DeedTypeSummary-callout-text'/>);
    }

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
              <Text text='Complete by:' className='DeedTypeSummary-callout-text' />
              <Text text={when} className='DeedTypeSummary-callout-text DeedTypeSummary-emphasis'/>
            </div>
          </div>
          <div className='DeedTypeSummary-where flexContainerRow'>
            <Text text='Where' className='DeedTypeSummary-callout-text DeedTypeSummary-vertical' style={textStyle}/>
            <div>
              <Text text={where} className='DeedTypeSummary-callout-text DeedTypeSummary-emphasis'/>
              {addressDetails}
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
