import React from 'react';
import Button from '../components/Button';
import Error from '../pages/Error';
import Image from '../components/Image';
import Text from '../components/Text';
import Title from '../components/Title';

function StartDeed (props) {
  if (!props.user.deeds.current) {
    return (<Error err='StartDeed: no current deed' />)
  }
  return (
    <div>
      <Title text='Your Deed' />
      <Image />
      <Text text='bla bla' />
      <Button text='Do it >' click={props.notImplemented}/>
      <Button text='< Pick another deed' click={props.notImplemented}/>
    </div>
  );
}

export default StartDeed;
