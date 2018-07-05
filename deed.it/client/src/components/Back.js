import React from 'react';
import Text from './Text';
import './Back.css';

function Back (props) {
  const { back } = props;
  const textProps = {
    className: 'Back-text',
    onClick: back,
    text: '< Back'
  }
  return (<Text {...textProps} />);
}

export default Back;
