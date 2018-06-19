import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';
import Text from '../components/Text';
import Title from '../components/Title';
import './legalese.css';

class Privacy extends Component {

  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = { progress: null };
  }

  reset () {
    this.setState({
      progress: {
        duration: 3000,
        text: 'Clearing all your user data...'
      }
    });
    this.props.reset();
  }

  render () {
    const { progress } = this.state;
    const progressBar = (progress) ? (<ProgressBar {...progress} />) : null;

    const forgetme = [
      'You have the right to be forgotten. Clicking ',
      (<a onClick={this.reset}>here</a>),
      ' will delete all data sent from this device, including uploaded images.'
    ];

    return (
      <div className='page'>
        <Title text='Deedit Privacy Policy'/>
        <div className='Legalese-container'>
          Introduction

          Your personal data: how we collect, use, and protect it. (Our ‘Privacy Policy’)
          We take your privacy very seriously. Please read this Privacy Policy carefully as it contains important information on who we are and how and why we collect, store, use and share your personal information. It also explains your rights in relation to your personal information and how to contact us or supervisory authorities in the event you have a complaint.

          This Privacy Policy applies to your participation in the deedit project and use of the deedit website at www.deedit.org .

          Who we are referring to when we say ‘we’, ‘us’, ‘our’ and "you" in this Privacy Policy
          This Privacy Policy explains how we (Tesco Personal Finance plc, trading as "Tesco Bank and part of the Tesco Group (www.tescoplc.com/about-us/)) use your personal data.  In this Privacy Policy, “we”, “us” and “our” refers to Tesco Bank.

          This Privacy Policy applies to the person participating in the deedit project and using the deedit website.  If you are using someone else's personal information (this will include a photo of them), please make sure that you have their permission to do so.
          Personal information we collect about you and how we use it
          When you use the deedit website, we may collect the following information from you (if you choose to provide it):
          •	Your nickname – the name you choose to call yourself to use deedit
          •	Age range
          •	Country you are from, and if Scotland which city you are from
          •	location data from your device (if you agree to this through the pop up on the website)
          •	photos of deeds completed
          •	any further information that you give to us when you contact us (for example to ask a query about the project or how we use your data)

          When you go to deedit.org we assign a random ID to your device.  This is not a device ID.  It is used so that if you decide to complete more than one deed we remember to show you your profile and your next deed can be added to your profile.   This is the only personalised service on deedit.  We do not capture any other information like device operating systems, IP addresses, signals, data etc.

          We will only use the above mentioned information to run the deedit project and website in order to perform our agreement with you.  We will not use your information to send you direct marketing.
          Who we share your personal information with
          After the project ends, we will share the photos that you have uploaded to deedit.org, with Social Bite (a limited company owned by a parent charity the Social Bite Fund – registered Scottish Charity SC045232, whose registered address is 1 St. Colme Street, Edinburgh, EH3 6AA).  Social Bite will use the project photos on their verified Social Bite social media channels (such as Facebook, Instagram and Twitter) to help promote their vision to eradicate homelessness in Scotland.  For more information about Social bite or to donate to their charity, please visit their website at http://social-bite.co.uk/

          We will also share information with our third party website and data hosting provider, Amazon Web Services ("AWS").  We do this so that we can host and operate the deedit website.  AWS may send personal data outside the European Economic Area. For more information, including on how we safeguard your personal information when this occurs, see below: ‘Transferring your personal information out of the EEA.
          How long your personal information will be kept
          We will delete your data by 30 September 2018 at the latest.   Social Bite will delete your data by [XXX] 2018].
          Transferring your personal information out of the EEA
          To run the deedit project, it may be necessary for us to share your personal information outside the European Economic Area (EEA).  These transfers are subject to special rules under European and UK data protection law.  If you would like further information please contact us (see ‘How to contact us’ below).
          Your rights
          You have the following rights, which you can exercise free of charge by contacting us (see the "Contact Us" section at the end of this Privacy Policy):
          Access	The right to be provided with a copy of your personal information (the right of access)
          Rectification	The right to require us to correct any mistakes in your personal information
          To be forgotten	The right to require us to delete your personal information—in certain situations
          Restriction of processing	The right to require us to restrict processing of your personal information—in certain circumstances, eg if you contest the accuracy of the data
          Data portability	The right to receive the personal information you provided to us, in a structured, commonly used and machine-readable format and/or transmit that data to a third party—in certain situations
          To object	The right to object at any time to your personal information being processed for direct marketing (including profiling) and in certain other situations to our continued processing of your personal information, eg processing carried out for the purpose of our legitimate interests.
          Not to be subject to automated individual decision-making	The right not to be subject to a decision based solely on automated processing (including profiling) that produces legal effects concerning you or similarly significantly affects you

          For more data about your rights, visit the Information Commissioner’s Office website
          The Information Commissioner’s Office is the UK’s independent authority set up to uphold information rights, and promote data privacy for individuals. Their website is www.ico.org.uk.

          If you have a complaint or concern about how we have handled your personal data and we have not been able to sort it out to your satisfaction, you have the right to lodge a complaint with the ICO.

          You have the right to withdraw your consent at any time
          Sometimes we need your consent to process your personal data. If you have given consent, you can change your mind and withdraw it. To do this, get in touch by using the relevant contact details below.
          Cookies
          Cookies are small computer files that are downloaded to your device when you visit a website. These small files hold information about that site. This means that when you return to a site you have visited before, the cookies help the site ‘remember’ you.

          We use cookies to help your visits to our website run smoothly, and be personal to you. Cookies help our website remember things like your nickname, uploads and your badges for deeds completed.
          Changes to this privacy policy
          We may change this Privacy Policy from time to time—when we do we will inform you via the deedit website.
          Contact us for more information about how we handle your personal data
          If you have concerns about how we handle your personal data, or just want more details, please call us on [    ] or write to us as the address below. We will try and sort things out as quickly as we can. Our address is:

          [      ]

        </div>
        <Text contents={forgetme}/>
        {progressBar}
      </div>
    );
  }
}

export default Privacy;
