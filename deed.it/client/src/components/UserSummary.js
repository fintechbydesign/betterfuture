import React from 'react';
import flags from '../../../common/src/images/flags';
import Image from './Image';
import Text from './Text';
import './UserSummary.css';

function UserSummary (props) {
  const { nickname, personal } = props;
  const { city, country } = personal;
  const location = (city) ? `${city}, ${country}` : country;
  return (
    <div className='flexContainerRow UserSummary-container'>
      <Image className='UserSummary-image' alt='flag' src={flags[country]} type='appImage' />
      <div className='flexContainerColumn' >
        <Text text={nickname} className='UserSummary-nickname' />
        <Text text={location} className='UserSummary-location' />
      </div>
    </div>
  );
}

export default UserSummary;
