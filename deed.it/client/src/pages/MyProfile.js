import React from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';
import WonderWall from '../components/WonderWall';

function Home (props) {
  return (
    <div className='page'>
      <Title text='Username' />
      <Text text='Location' />
      <Text text='Badges' />
      <Text text='Trophies' />
      <Title text='In Progress' />
      <Button click={props.notImplemented} text="I've done it" />
      <Title text='Previous Deeds' />
    </div>
  );
}

export default Home;
