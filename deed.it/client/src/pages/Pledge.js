import React from 'react';
import CompleteDeed from '../components/CompleteDeed'
import Image from '../components/Image';
import Text from '../components/Text';
import Title from '../components/Title';
import './Pledge.css';

function Pledge (props) {
  const { user } = props;
  const { deed } = user.selected;
  const completeDeedProps = {
    deed,
    navigateFns: props,
    text: 'I promise I\'ve done it >',
    user
  };
  return (
    <div className='page'>
      <Title text='Your Deed' />
      <Text text="We'll take you word for it if you just sign this pledge and promise you've done this good deed." />
      <Image />
      <Text text='I promise that I did my good deed for Edinburgh.' className='Pledge-quote' />
      <CompleteDeed {...completeDeedProps} />
    </div>
  );
}

export default Pledge;
