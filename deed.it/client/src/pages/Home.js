import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import superdeedStyles from '../components/superDeedStyles';
import Text from '../components/Text';
import Title from '../components/Title';
import './Home.css';


function renderHomeless () {
  return (
    <div className={`Home-superdeed-container flexContainerColumn ${superdeedStyles[2].className}`}>
      <div className='flexContainerRow'>
        <div className='flexContainerColumn'>
          <Text className='Home-text Home-x-large-plain-font' text='More than' />
          <Text className='Home-text Home-xx-large-font' text='200' />
          <Text className='Home-text Home-x-large-font' text='people' />
          <Text className='Home-text Home-large-plain-font' text='will sleep rough tonight in Edinburgh' />
        </div>
        <Image className='Home-superdeed-icon' src={superdeedStyles[2].icon} />
      </div>
      <div className={`Home-call-to-action-container flexContainerRow`}>
        <Text className='Home-text Home-large-font' text="You can help Edinburgh's homeless" />
        <Text className='Home-text Home-large-font' text='>' />
      </div>
    </div>
  );
}

function renderGreen () {
  return (
    <div className={`Home-superdeed-container flexContainerColumn ${superdeedStyles[1].className}`}>
      <div className='flexContainerRow'>
        <div className='flexContainerColumn'>
          <Text className='Home-text Home-large-plain-font' text='Edinburgh spends' />
          <Text className='Home-text Home-x-large-plain-font' text='more than' />
          <Text className='Home-text Home-xx-large-font' text='£7M' />
          <Text className='Home-text Home-x-large-font' text='a year' />
          <Text className='Home-text Home-large-plain-font' text='on landfill waste' />
        </div>
        <Image className='Home-superdeed-icon' src={superdeedStyles[1].icon} />
      </div>
      <div className={`Home-call-to-action-container flexContainerRow`}>
        <Text className='Home-text Home-large-font' text="You can help Edinburgh be greener" />
        <Text className='Home-text Home-large-font' text='>' />
      </div>
    </div>
  );
}

function renderHappy () {
  return (
    <div className={`Home-superdeed-container flexContainerColumn ${superdeedStyles[0].className}`}>
      <div className='flexContainerRow'>
        <div className='flexContainerColumn'>
          <Text className='Home-text Home-x-large-plain-font' text='More than' />
          <Text className='Home-text Home-xx-large-font' text='10%' />
          <Text className='Home-text Home-x-large-font' text='adults' />
          <Text className='Home-text Home-x-large-plain-font' text='in Scotland feel' />
          <Text className='Home-text Home-large-plain-font' text='lonely all the time' />
        </div>
        <Image className='Home-superdeed-icon' src={superdeedStyles[0].icon} />
      </div>
      <div className={`Home-call-to-action-container flexContainerRow`}>
        <Text className='Home-text Home-large-font' text="You can build community spirit in Edinburgh" />
        <Text className='Home-text Home-large-font' text='>' />
      </div>
    </div>
  );
}

function Home (props) {
  const { aboutUs, myProfile, pickADeed, user } = props;
  const getInvolvedAction = user.registered ? myProfile : pickADeed;
  const aboutUsContents = [
    'If you want to know more about Deedit, who we are and what we do, ',
    (<a onClick={aboutUs}>visit our About Us page.</a>)
  ];
  return (
    <div className='page'>
      <Title text='Hi There' />
      <Title text='Did you know?' />
      {renderHomeless()}
      {renderGreen()}
      {renderHappy()}
      <Title text='So what are you waiting for?' />
      <Button onClick={getInvolvedAction} text='Get involved now' />
      <Text contents={aboutUsContents} />
    </div>
  );
}

export default Home;
