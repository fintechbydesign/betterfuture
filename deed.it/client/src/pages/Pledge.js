import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import Text from '../components/Text';
import Title from '../components/Title';
import './Pledge.css';

function Pledge (props) {
  const { completeDeed, deed, locationPromise } = props;
  const buttonProps = {
    onClick: completeDeed.bind(null, { deed, locationPromise } ),
    text: 'I promise I\'ve done it >',
  };
  return (
    <div className='page'>
      <Title text='Your Deed' />
      <Text text="We'll take you word for it if you just sign this pledge and promise you've done this good deed." />
      <Image />
      <Text text='I promise that I did my good deed for Edinburgh.' className='Pledge-quote' />
      <Button {...buttonProps} />
    </div>
  );
}

export default Pledge;
