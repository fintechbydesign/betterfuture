import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Text from '../components/Text';
import Title from '../components/Title';

const randomText = loremIpsum.bind(null,{
  count: 3,
  units: 'sentences',
  format: 'plain'
});

function AboutUs (props) {
  return (
    <div>
      <Title text='About Us' />
      <Text text={randomText()} />
      <Title text='The Deedit Team' />
      <Text text={randomText()} />
      <Title text='Contact Us' />
      <Text text={randomText()} />
    </div>
  );
}

export default AboutUs;
