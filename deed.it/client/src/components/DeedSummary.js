import React, { Component } from 'react';
import Image from './Image';
import Text from './Text';
import './DeedSummary.css';
import DeedTypeSummary from "./DeedTypeSummary";
import expand from '../images/Add.svg';
import contract from '../images/Remove.svg';

class DeedSummary extends Component {

  constructor (props) {
    super(props);
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.state = {
      expanded: props.expand
    }
  }

  toggleExpansion () {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded
    });
  }

  render () {
    const { buttonText, deed, hideButton, key, onButtonClick, onImageClick } = this.props;
    const { expanded } = this.state;
    const { deedTypeId, description, src, style } = deed;
    const { className } = style;
    const divClassName = `DeedSummary-container ${className}`;
    const toggleImageProps = {
      className: 'DeedSummary-image',
      src: (expanded) ? contract : expand,
      type: 'appImage'
    };
    const deedImageProps = (src)
      ? {
          onClick: onImageClick,
          src,
          type: 'userImage'
        }
      : null;
    const deedTypeProps = {
      buttonText,
      className: 'Deed-Summary-dropin',
      deedType: {
        description,
        id: deedTypeId,
        style},
      hideButton,
      imageProps: deedImageProps,
      onClick: async() => {
        await onButtonClick();
        this.toggleExpansion();
      }
    };
    const expandedContents = (expanded) ? (<DeedTypeSummary {...deedTypeProps} />) : null;
    return (
      <div className={divClassName} key={key}>
        <div onClick={this.toggleExpansion}>
          <Image {...toggleImageProps} />
          <Text text={deedTypeId}/>
        </div>
        {expandedContents}
      </div>
    );
  }
}

export default DeedSummary;
