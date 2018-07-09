import React from 'react';
import Image from './Image';
import Text from './Text';
import './Thanks.css';

const texts = [
  {
    title: 'Thank you from SocialBite',
    text: 'A huge thank you for supporting SocialBite with this good deed.',
    content: [
      'If you\'d like to donate further to their cause, ',
      (<a href='https://www.justgiving.com/social-bite' rel='noreferrer noopener' target='_blank'>visit their JustGiving page.</a>)
    ]
  },
  {
    title: 'Thank you',
    text: 'We really thank you for doing a good deed to help keep Edinburgh green.',
    content: [] // 'You can see how all the small good deeds are adding up to big changes by visiting us in George Street, Edinburgh this August.']
  },
  {
    title: 'Thank you',
    text: 'We really thank you for doing a good deed to help keep Edinburgh happy.',
    content: [] // 'You can see how all the small good deeds are adding up to big changes by visiting us in George Street, Edinburgh this August.']
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
