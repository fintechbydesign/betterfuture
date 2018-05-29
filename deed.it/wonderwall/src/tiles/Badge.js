import React from 'react';
import Image from './Image';

function Badge (props) {
  const imgProps = { ...props, alt:'a badge' };
  return (<Image {...imgProps} />);
}

export default Badge;
