import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Button from '../components/Button';
import Title from '../components/Title';
import Video from '../components/Video';
import WonderWall from '../components/WonderWall';

const randomText = loremIpsum.bind(null,{
  count: 3,
  units: 'sentences',
  format: 'plain'
});

function Home (props) {
  return (
    <div>
      <Title text='Welcome to Deedit' />
      <WonderWall />
      <Button click={props.register} text='Get involved >' />
      <div>Small things add up to make a big difference.</div>
      <div>{randomText()}</div>
      <div>{randomText()}</div>
      <div>Watch our short video to see how Deedit works.</div>
      <Video />
    </div>
  );
}

export default Home;
