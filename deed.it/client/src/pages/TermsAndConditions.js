import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';

const randomTextProps = {
  count: 50,
  units: 'sentences',
  format: 'plain'
};

function TermsAndConditions (props) {
  return (
    <div className='page'>
      <Title text='Deedit Terms and Conditions' />
      <Text text={randomTextProps} />
    </div>
  );
}

export default TermsAndConditions;
