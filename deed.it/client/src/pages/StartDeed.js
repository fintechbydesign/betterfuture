import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import Text from '../components/Text';
import Title from '../components/Title';
import {createSelectedDeed} from "../data/deeds";

function StartDeed (props) {
  const { error, myProfile, register, user } = props;
  const { deeds, registered } = user;
  const { superDeed, deedType } = deeds.selected;

  const startDeed = async() => {
    try {
      await createSelectedDeed(user);
      myProfile();
    } catch (err) {
      error(err);
    }
  }

  const doIt = (registered) ? startDeed : register;

  return (
    <div>
      <Title text={superDeed.id} />
      <Text text={superDeed.description} />
      <Title text='Your Deed' />
      <Image src={deedType.image} />
      <Text text={deedType.description} />
      <Button text='Do it >' click={doIt} />
      <Button text='< Pick another deed' click={props.pickADeed} />
    </div>
  );
}

export default StartDeed;
