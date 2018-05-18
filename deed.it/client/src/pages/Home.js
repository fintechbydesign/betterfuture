import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Button from '../components/Button';
import Text from '../components/Text';
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
      <Text text='Small things add up to make a big difference.' />
      <Text text={randomText()} />
      <Text text={randomText()} />
      <Text text='Watch our short video to see how Deedit works.' />
      <Video src={homeVideo}/>
    </div>
  );
}

export default Home;
