import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import superdeedStyles from '../components/superDeedStyles';
import Text from '../components/Text';
import Title from '../components/Title';
import TitleWithImage from '../components/TitleWithImage';
import chevron from '../images/chevron.svg';
import wavingHand from '../images/waving-hand.svg';
import './Home.css';

function renderHomeless (getInvolvedAction) {
  return (
    <div className={`Home-superdeed-container flexContainerColumn ${superdeedStyles[0].className}`} onClick={getInvolvedAction}>
      <div className={`Home-superdeed-description-container flexContainerRow`}>
        <div className='flexContainerColumn'>
          <Text className='Home-text Home-x-large-plain-font' text='More than' />
          <Text className='Home-text Home-xx-large-font' text='200' />
          <Text className='Home-text Home-x-large-font' text='people' />
          <Text className='Home-text Home-large-plain-font' text='will sleep rough tonight in Edinburgh' />
        </div>
        <Image className='Home-superdeed-icon' src={superdeedStyles[0].homeIcon} />
      </div>
      <div className={`Home-call-to-action-container flexContainerRow`}>
        <Text className='Home-text Home-large-font' text="Help Edinburgh's homeless" />
        <Image src={chevron} className='Home-chevron' />
      </div>
    </div>
  );
}

function renderGreen (getInvolvedAction) {
  return (
    <div className={`Home-superdeed-container flexContainerColumn ${superdeedStyles[1].className}`} onClick={getInvolvedAction}>
      <div className={`Home-superdeed-description-container flexContainerRow`}>
        <div className='flexContainerColumn'>
          <Text className='Home-text Home-large-plain-font' text='Edinburgh spends' />
          <Text className='Home-text Home-x-large-plain-font' text='more than' />
          <Text className='Home-text Home-xx-large-font' text='£7M' />
          <Text className='Home-text Home-x-large-font' text='a year' />
          <Text className='Home-text Home-large-plain-font' text='on landfill waste' />
        </div>
        <Image className='Home-superdeed-icon' src={superdeedStyles[1].homeIcon} />
      </div>
      <div className={`Home-call-to-action-container flexContainerRow`} >
        <Text className='Home-text Home-large-font' text='Help Edinburgh be greener' />
        <Image src={chevron} className='Home-chevron' />
      </div>
    </div>
  );
}

function renderHappy (getInvolvedAction) {
  return (
    <div className={`Home-superdeed-container flexContainerColumn ${superdeedStyles[2].className}`} onClick={getInvolvedAction}>
      <div className={`Home-superdeed-description-container flexContainerRow`}>
        <div className='flexContainerColumn'>
          <Text className='Home-text Home-x-large-plain-font' text='More than' />
          <Text className='Home-text Home-xx-large-font' text='10%' />
          <Text className='Home-text Home-x-large-font' text='of adults' />
          <Text className='Home-text Home-x-large-plain-font' text='in Scotland feel' />
          <Text className='Home-text Home-large-plain-font' text='lonely all the time' />
        </div>
        <Image className='Home-superdeed-icon' src={superdeedStyles[2].homeIcon} />
      </div>
      <div className={`Home-call-to-action-container flexContainerRow`} >
        <Text className='Home-text Home-large-font' text='Build community spirit in Edinburgh' />
        <Image src={chevron} className='Home-chevron' />
      </div>
    </div>
  );
}

function Home (props) {
  const { aboutUs, myProfile, pickADeed, user } = props;
  const { openDeedCount, registered } = user;
  const introText = 'Deedit is a social experiment running in Edinburgh throughout August.  ' +
    'We want to find out if encouraging lots of people to do small good deeds can add up to a much bigger positive outcome.';
  const aboutUsContents = [
    'If you want to know more about Deedit, who we are and what we do, ',
    (<a key='link' onClick={aboutUs}>visit our About Us page.</a>)
  ];
  const titleText = (registered && openDeedCount > 0)
    ? 'Are you all done?'
    : 'So what are you waiting for?';
  const buttonProps = (registered && openDeedCount > 0)
    ? { onClick: myProfile, text: 'Report Deed Done' }
    : { onClick: pickADeed, text: 'Get Involved Now' };
  return (
    <div className='page'>
      <TitleWithImage animation='wave' src={wavingHand} text='Hi There' />
      <Text text={introText} />
      <Title text='Did you know?' />
      {renderHomeless(pickADeed)}
      {renderGreen(pickADeed)}
      {renderHappy(pickADeed)}
      <Title text={titleText} />
      <Button {...buttonProps} />
      <Text contents={aboutUsContents} />
    </div>
  );
}

export default Home;
