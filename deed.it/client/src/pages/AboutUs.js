import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Title from '../components/Title.js';

const randomText = loremIpsum.bind(null,{
  count: 3,
  units: 'sentences',
  format: 'plain'
});

function AboutUs (props) {
  return (
    <div>
      <Title text='About Us' />
      <div>{randomText()} </div>
      <Title text='The Deedit Team' />
      <div>{randomText()} </div>
      <Title text='Contact Us' />
      <div>{randomText()} </div>
    </div>
  );
}

export default AboutUs;
