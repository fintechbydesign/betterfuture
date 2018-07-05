import React from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';

function Exhort (props) {
  const { myProfile } = props;
  return (
    <div className='page'>
      <Title text='Do Your Deed' />
      <Text text="Time to get busy. Remember to come back to www.deedit.org to tell us when you've done your deed." />
      <Button text='Got it!' onClick={myProfile} />
    </div>
  );
}

export default Exhort;
