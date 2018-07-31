import React from 'react';
import Image from './Image';
import Text from './Text';
import './Thanks.css';

const texts = [
  {
    title: 'Thank you from Social Bite',
    text: 'A huge thank you for supporting Social Bite with this good deed.',
    content: [
      'If you\'d like to donate further to their cause, ',
      (<a href='https://www.justgiving.com/social-bite' rel='noreferrer noopener' target='_blank'>visit their JustGiving page.</a>)
    ]
  },
  {
    title: 'Thank you for doing a good deed for us today',
    text: "You're on a roll... there are still more deeds to be done!",
    content: []
  },
  {
    title: 'Thank you for doing a good deed for us today',
    text: "You're on a roll... there are still more deeds to be done!",
    content: []
  }
];

function Thanks (props) {
  const { deed } = props;
  const { style } = deed;
  const { index, className, icon } = style;
  return (
    <div className={`Thanks-container ${className}`} >
      <div className='flexContainerRow Thanks-title'>
        <Image src={icon} className='Thanks-image fadein' />
        <Text text={texts[index].title} className='Thanks-title-text' />
      </div>
      <Text text={texts[index].text} className='Thanks-text' />
      <Text contents={texts[index].content} className='Thanks-text' />
    </div>
  );
}

export default Thanks;
