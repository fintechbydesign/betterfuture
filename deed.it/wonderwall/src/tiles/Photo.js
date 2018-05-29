import React from 'react';
import Image from './Image';

function Photo (props) {
  const imgProps = { ...props, alt:'deed evidence' };
  return (<Image {...imgProps} />);
}

export default Photo;
