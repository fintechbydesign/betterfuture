import React from 'react';
import Image from './Image';
import Text from './Text';
import './TextWithIcon.css';

function TextWithIcon (props) {
  return (
    <header className='flexContainerRow'>
      <Image className='TextWithIcon-image' alt='logo' src={props.image} />
      <Text text={props.description} />
    </header>
  );
}

export default TextWithIcon;
