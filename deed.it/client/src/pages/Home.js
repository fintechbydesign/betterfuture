import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Button from '../components/Button';
import Title from '../components/Title';
import Video from '../components/Video';
import WonderWall from '../components/WonderWall';
import homeVideo from '../videos/big_buck_bunny.mp4';

const randomText = loremIpsum.bind(null,{
  count: 3,
  units: 'sentences',
  format: 'plain'
});

function Home (props) {
  return (
    <div className='page'>
      <Title text='Welcome to Deedit' />
      <WonderWall />
      <Button click={props.register} text='Get involved >' />
      <div className='displayText'>Small things add up to make a big difference.</div>
      <div className='displayText'>{randomText()}</div>
      <div className='displayText'>{randomText()}</div>
      <div className='displayText'>Watch our short video to see how Deedit works.</div>
      <Video src={homeVideo}/>
    </div>
  );
}

export default Home;
