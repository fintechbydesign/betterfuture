import React from 'react';
import Text from '../components/Text';
import Title from '../components/Title';

const randomTextProps = {
  count: 3,
  units: 'sentences',
  format: 'plain'
};



function AboutUs(props) {
  const { privacy, termsAndConditions} = props;

  const tandc = [
    'See our ',
    (<a key='tandc' onClick={termsAndConditions}>terms and conditions</a>),
    '.'
  ];

  const privacyPolicy = [
    'See our ',
    (<a key='tandc' onClick={privacy}>privacy policy</a>),
      '.'
  ];

  return (
    <div className='page'>
      <Title text='About Us'/>
      <Text dummyText={randomTextProps}/>
      <Title text='The Deedit Team'/>
      <Text dummyText={randomTextProps}/>
      <Title text='Contact Us'/>
      <Text dummyText={randomTextProps}/>
      <Title text='T&C's/>
      <Text contents={tandc} />
      <Text contents={privacyPolicy} />
    </div>
  );
}

export default AboutUs;
