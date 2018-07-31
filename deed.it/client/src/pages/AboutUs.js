import React from 'react';
import Back from '../components/Back';
import Image from '../components/Image'
import Text from '../components/Text';
import Title from '../components/Title';
import { emailAddress } from '../config/email';
import { version } from '../../package';
import TescoBank from '../images/TescoBank.svg'
import UniLogo from '../images/uni-logo.png'
import './AboutUs.css';
import './legalese.css';

function AboutUs (props) {
  const { privacy, termsAndConditions} = props;

  return (
    <div className='page'>
      <Back back={props.back} />
      <Title text="It's all about us" />
      <div className='Legalese-container'>
        <h1>
          Wondering what Deedit is all about?
        </h1>
        <p>
          Deedit is a social activism campaign running in Edinburgh throughout August.  We want to find out if encouraging lots of people to do small good deeds can add up to a much bigger positive outcome.
        </p>
        <h1>
          Who are we?
        </h1>
        <p>
          We are project team who have developed this concept as part of a showcase of interactive installations, created in collaboration between Tesco Bank and Edinburgh University.
        </p>
        <div className='flexContainerRow' >
          <Image src={UniLogo} className='AboutUs-image' />
          <Image src={TescoBank} className='AboutUs-image' />
        </div>
        <p>
          You can visit Deedit at an exhibition called <a href='https://www.eca.ed.ac.uk/event/data-pipe-dreams-glimpses-near-future' rel='noreferrer noopener' target='_blank' >Data Pipe Dreams: Glimpses of a near future</a> from 2-25 August on George St., Edinburgh.
        </p>
        <h1>
          Contact Us
        </h1>
        <p>
          You can get in touch on email at <a href='mailto:{emailAddress}'>{emailAddress}</a>
        </p>
        <h1>How does it all work?</h1>
        <p>
          It’s simple.  You choose a deed, you do that deed and then you tell us about it by sending us some evidence.
        </p>
        <p>
          All our deeds are super simple to complete - even the kids can get involved.
        </p>
        <p>
          We record the deeds that are done so we can measure the difference all you kind hearted people are making to our three causes.
        </p>
        <h1>
          What we do with the data you give us?
        </h1>
        <p>
          We ask for some basic information when you decide to do a deed.  This info is only stored so we can measure the impact of all the small deeds and it’s only stored for 30 days.  Then we delete it.
        </p>
        <p>
          You can read more about <a onClick={privacy}>how we use your data</a> and our full <a onClick={termsAndConditions}>terms of use</a> if you want to know more.
        </p>
        <h1>
          Who are Social Bite?
        </h1>
        <p>
          Social Bite is on a mission to build a collaborative movement to end homelessness in Scotland. They make houses available to the homeless and fund a support resource for people to sustain their tenancies, integrating the vulnerable and marginalised back into society - where they belong.
        </p>
      </div>
      <Back back={props.back} />
      <Text text={`app version ${version}`} className='AboutUs-version' />
    </div>
  );
}

export default AboutUs;
