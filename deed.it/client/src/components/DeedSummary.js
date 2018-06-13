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
    // const expanded = (expand in props) ? props.expand: false;
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
    const { buttonText, deed, hideButton, key, onClick } = this.props;
    const { expanded } = this.state;
    const { deedTypeId, description, style} = deed;
    const divClassName = `DeedSummary-container ${style.className}`;
    const imageProps = {
      className: 'DeedSummary-image',
      src: (expanded) ? contract : expand,
      type: 'appImage'
    };
    const deedTypeProps = {
      buttonText,
      className: 'Deed-Summary-dropin',
      deedType: {
        description,
        id: deedTypeId,
        style},
      hideButton,
      onClick
    };
    const expandedContents = (expanded) ? (<DeedTypeSummary {...deedTypeProps} />) : null;
    return (
      <div className={divClassName} key={key}>
        <div onClick={this.toggleExpansion}>
          <Image {...imageProps} />
          <Text text={deedTypeId}/>
        </div>
        {expandedContents}
      </div>
    );
  }
}

export default DeedSummary;
