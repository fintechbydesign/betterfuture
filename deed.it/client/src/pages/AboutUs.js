import React from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';

const randomTextProps = {
  count: 3,
  units: 'sentences',
  format: 'plain'
};

function AboutUs (props) {
  return (
    <div className='page'>
      <Title text='About Us' />
      <Text dummyText={randomTextProps} />
      <Title text='The Deedit Team' />
      <Text dummyText={randomTextProps} />
      <Title text='Contact Us' />
      <Text dummyText={randomTextProps} />
      <Title text='Forget about me' />
      <Text text='You have the right to be forgotten' />
      <Button text='Forget about me' onClick={props.reset} />
    </div>
  );
}

export default AboutUs;
