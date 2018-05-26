import React from 'react';
import Text from './Text';

function Fetching (props) {
  const text = props.text ? props.text : 'Fetching...';
  return <Text text={text} />;
}

export default Fetching;
