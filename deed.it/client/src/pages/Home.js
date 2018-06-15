import React from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';

const randomTextProps = {
  count: 3,
  units: 'sentences',
  format: 'plain'
};

function Home (props) {
  const { myProfile, pickADeed, user } = props;
  const getInvolvedAction = user.registered ? myProfile : pickADeed;
  return (
    <div className='page'>
      <Title text='Welcome to Deedit' />
      <Button onClick={getInvolvedAction} text='Get involved >' />
      <Text text='Small things add up to make a big difference.' />
      <Text dummyText={randomTextProps} />
      <Text dummyText={randomTextProps} />
      <Text text='Watch our short video to see how Deedit works.' />
    </div>
  );
}

export default Home;
