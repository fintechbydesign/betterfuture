import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import Text from '../components/Text';
import Title from '../components/Title';

function StartDeed (props) {
  const { user } = props;
  const { superDeed, deedType } = user.deeds.selected;

  return (
    <div>
      <Title text={superDeed.id} />
      <Text text={superDeed.description} />
      <Title text='Your Deed' />
      <Image src={deedType.image} />
      <Text text={deedType.description} />
      <Button text='Do it >' click={props.register} />
      <Button text='< Pick another deed' click={props.pickADeed} />
    </div>
  );
}

export default StartDeed;
