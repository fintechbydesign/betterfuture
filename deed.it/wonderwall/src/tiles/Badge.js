import React from 'react';
import Image from './Image';

import bronze from '../images/bronze-badge.png';
import silver from '../images/silver-badge.png';
import gold from '../images/gold-badge.png';
import placeholder from '../images/placeholder.png';

const badges = { bronze, silver, gold };

function Badge (props) {
  const src = badges[props.src] ? badges[props.src] : badges[placeholder];
  const imgProps = { ...props, alt:'a badge', src };
  return (<Image {...imgProps} />);
}

export default Badge;
