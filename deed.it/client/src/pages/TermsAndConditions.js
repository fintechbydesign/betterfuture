import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Title from '../components/Title.js';

const randomText = loremIpsum.bind(null,{
  count: 50,
  units: 'sentences',
  format: 'plain'
});

function TermsAndConditions (props) {
  return (
    <div>
      <Title text='Deedit Terms and Conditions' />
      <div>{randomText()} </div>
    </div>
  );
}

export default TermsAndConditions;
