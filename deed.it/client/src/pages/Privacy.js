import React, { Component } from 'react';
import Back from '../components/Back';
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
    const { back } = this.props;
    const { progress } = this.state;
    const progressBar = (progress) ? (<ProgressBar {...progress} />) : null;

    const forgetme = [
      'You have the right to be forgotten. Clicking ',
      (<a onClick={this.reset}>here</a>),
      ' will delete all data sent from this device, including uploaded images.'
    ];

    return (
      <div className='page'>
        <Back back={back} />
        <Title text='Deedit Privacy Policy' />
        <div className='Legalese-container'>
          <h1>
            Introduction
          </h1>
          <h1>
            Your personal data: how we collect, use, and protect it (our "Privacy Policy")
          </h1>
          <p>
            We take your privacy very seriously. Please read this Privacy Policy carefully as it contains important information on who we are and how and why we collect, store, use and share your personal information. It also explains your rights in relation to your personal information and how to contact us or supervisory authorities in the event you have a complaint.
          </p>
          <p>
            This Privacy Policy applies to your participation in the Deedit project (the "Project") and use of the Deedit website at www.deedit.org (the "Website").
          </p>
          <h1>
          Who we are referring to when we say "we", "us", "our" and "you" in this Privacy Policy
          </h1>
          <p>
            This Privacy Policy explains how we (Tesco Personal Finance plc, trading as 'Tesco Bank' and part of the Tesco Group (www.tescoplc.com/about-us/)) use your personal data.  In this Privacy Policy, "we", "us" and "our" refers to Tesco Personal Finance plc.
          </p>
          <p>
            This Privacy Policy applies to the person participating in the Project and using the Website.  If you are using someone else's personal information (this will include a photo of them), please make sure that you have their permission to do so.
          </p>
          <h1>
            Personal information we collect about you and how we use it
          </h1>
          <p>
            When you use the Website, we may collect the following information from you (if you choose to provide it):
            <ul>
              <li>your nickname – the name you choose to call yourself to participate in the Project</li>
              <li>your age range</li>
              <li>country you are from, and if Scotland which city you are from</li>
              <li>location data from your device (if you agree to this through the pop up on the Website)</li>
              <li>photos of deeds completed</li>
              <li>any further information that you give to us when you contact us (for example to ask a query about the project or how we use your data).</li>
            </ul>
          </p>
          <p>
            When you go to the Website, we assign a random ID to your device.  This is not a device ID.  It is used so that if you decide to complete more than one deed we remember to show you your profile and your next deed can be added to your profile.   This is the only personalised service on the Website.  We do not capture any other information like device operating systems, IP addresses, signals, data etc.
          </p>
          <p>
            We will only use the above mentioned information to run the Project and Website in order to perform our agreement with you.  We will not use your information to send you direct marketing.
          </p>
          <h1>
            Who we share your personal information with
          </h1>
          <p>
            We will share information with our third party website and data hosting provider, Amazon Web Services ("AWS").  We do this so that we can host and operate the Deedit website.  AWS may send personal data outside the European Economic Area. For more information, including on how we safeguard your personal information when this occurs, see below: ‘Transferring your personal information out of the EEA'.
          </p>
          <h1>
              How long your personal information will be kept
           </h1>
          <p>
            We will delete your data by 30 September 2018 at the latest.
          </p>
          <h1>
            Transferring your personal information out of the EEA
          </h1>
          <p>
            To run the Project, it may be necessary for us to share your personal information outside the European Economic Area (EEA).  These transfers are subject to special rules under European and UK data protection law.  If you would like further information please contact us (see ‘How to contact us’ below).
          </p>
          <h1>
            Your rights
          </h1>
          <p>
          You have the following rights, which you can exercise free of charge by contacting us (see the 'Contact Us' section at the end of this Privacy Policy):
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  Access
                </td>
                <td>
                  The right to be provided with a copy of your personal information (the right of access)
                </td>
              </tr>
              <tr>
                <td>
                  Rectification
                </td>
                <td>
                  The right to require us to correct any mistakes in your personal information
                </td>
              </tr>
              <tr>
                <td>
                  To be forgotten
                </td>
                <td>
                  The right to require us to delete your personal information—in certain situations
                </td>
              </tr>
              <tr>
                <td>
                  Restriction of processing
                </td>
                <td>
                  The right to require us to restrict processing of your personal information—in certain circumstances, e.g. if you contest the accuracy of the data
                </td>
              </tr>
              <tr>
                <td>
                  Data portability
                </td>
                <td>
                  The right to receive the personal information you provided to us, in a structured, commonly used and machine-readable format and/or transmit that data to a third party—in certain situations
                </td>
              </tr>
              <tr>
                <td>
                  To object
                </td>
                <td>
                  We are not processing your personal information for direct marketing. If later you grant us consent to do so, you have the right to object at any time to your personal information being processed for direct marketing (including profiling) and in certain other situations to our continued processing of your personal information, eg processing carried out for the purpose of our legitimate interests.
                </td>
              </tr>
              <tr>
                <td>
                  Not to be subject to automated individual decision-making
                </td>
                <td>
                  We are not carrying out automated processing of your personal information.  If later you grant us consent to do so, you have the right not to be subject to a decision based solely on automated processing (including profiling) that produces legal effects concerning you or similarly significantly affects you
                </td>
              </tr>
            </tbody>
          </table>
          <h1>
            For more data about your rights, visit the Information Commissioner’s Office website
          </h1>
          <p>
            The Information Commissioner’s Office is the UK’s independent authority set up to uphold information rights, and promote data privacy for individuals. Their website is
            <a href='http://www.ico.org.uk' rel='noreferrer noopener' target='_blank' > www.ico.org.uk</a>.
          </p>
          <p>
            If you have a complaint or concern about how we have handled your personal data and we have not been able to sort it out to your satisfaction, you have the right to lodge a complaint with the ICO.
          </p>
          <h1>
            You have the right to withdraw your consent at any time
          </h1>
          <p>
            Sometimes we need your consent to process your personal data. If you have given consent, you can change your mind and withdraw it. To do this, get in touch by using the relevant contact details below.
          </p>
          <h1>
            Changes to this Privacy Policy
          </h1>
          <p>
            We may change this Privacy Policy from time to time—when we do we will inform you via the Deedit website.
          </p>
          <h1>
            Contact us for more information about how we handle your personal data
          </h1>
          <p>
            If you have concerns about how we handle your personal data, or just want more details, please call us on 0345 0716155 or write to us as the address below. We will try and sort things out as quickly as we can. Our address is: The Data Protection Officer, Tesco Bank, PO BOX 27009, Glasgow, G2 9EZ
          </p>

        </div>
        <Text contents={forgetme} />
        {progressBar}
        <Back back={back} />
      </div>
    );
  }
}

export default Privacy;
