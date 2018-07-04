import React from 'react';
import Image from '../components/Image';
import Text from '../components/Text';
import './Picture.css';

function Picture (props) {
  const { myProfile, src, type } = props;
  const imageProps = {
    className: 'Picture-image',
    onClick: myProfile,
    src,
    type
  };
  const textProps = {
    className: 'Picture-text',
    contents: [
      'Back to ',
      (<a key='link' onClick={myProfile}>My Profile</a>)
    ]
  };
  return (
    <div>
      <Image {...imageProps} />
      <Text {...textProps} />
    </div>
  );
}

export default Picture;
