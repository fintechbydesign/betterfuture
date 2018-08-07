import React from 'react';
import Back from '../components/Back';
import EasterEgg from "../components/EasterEgg";
import Title from '../components/Title';
import { emailAddress } from '../config/email';
import './legalese.css';

function TermsAndConditions (props) {
  const { back, badge, privacy } = props;
  return (
    <div className='page'>
      <Back back={back} />
      <Title text='Terms of Use' />
      <div className='Legalese-container'>
        <h1>
          Welcome to Deedit
        </h1>
        <p>
         The Deedit project (the "Project") is a digital social experiment to prove that the smallest action can make a positive difference to Edinburgh.   We want to see whether people are willing to do a small good deed to help a local cause, like homelessness.
        </p>
        <h1>
          How it works
        </h1>
        <p>
         Simply choose which cause you are interested in helping and pick a good deed to complete.  Then upload a photo or video to the webapp at deedit.org to tell us that your deed is complete.   In return, you will be awarded a digital badge, which you can view on your deedit profile page.  All the deeds will be counted and we will track progress against the big targets or 'Mega Deeds', like 'Reducing Homelessness in Edinburgh' or 'Making Edinburgh Green'.
        </p>
        <h1>
         Who we are
        </h1>
        <p>
          The Project is organised and run by Tesco Personal Finance plc, trading as 'Tesco Bank' trading as '"Tesco Bank' and part of the Tesco Group (<a href='www.tescoplc.com/about-us'>www.tescoplc.com/about-us</a>) ("Tesco Bank", "we", "us", "our") and is a part of a showcase of prototypes and interactive installations by Edinburgh University.  The Deedit project will run from 2 – 25 August (inclusive) as part of an exhibition called "Data Pipe Dreams: Glimpses of a Near Future".
          To find out more, go to: <a href='www.designinformatics.org/event/data-pipe-dreams' target='_blank' >www.designinformatics.org/event/data-pipe-dreams</a>.
        </p>
        <p>
          As part of the Edinburgh festival, Tesco Bank is partnering with Social Bite, a local charity which aims to eradicate homelessness in Edinburgh.
        </p>
        <p>
          These Terms of Use, together with the Deedit Privacy Statement, govern your participation in the Project and use of deedit webapp. When you provide information through your participation in the Project, you agree to these terms.   If you do not agree to these terms, including the privacy policy, please do not upload anything to deedit.  These Terms of Use constitute an agreement between you and Tesco Bank.
        </p>
        <h1>
          How we use your data
        </h1>
        <h1>
         Data collected during the Project
        </h1>
        <p>
          During the Project, we will collect the following information if you choose to provide it:
          <ul>
            <li>Your nickname – the name you choose to call yourself to participate in the Project</li>
            <li>Your age range</li>
            <li>Country you are from, and if Scotland which city you are from</li>
            <li>Location data from your device (if you agree to it through the pop up on the website)</li>
            <li>Photos of deeds completed</li>
            <li>Any further information that you give to us when you contact us.</li>
          </ul>
        </p>
        <p>
          When you go to deedit.org we assign a random ID to your device.  This is not a device ID and it does not track you or your location.  It is used so that if you decide to complete more than one deed we remember to show you your profile and your next deed can be added to your profile.   This is the only personalised service on deedit.
        </p>
        <p>
          We do not capture any other information like device operating systems, IP addresses, signals, data etc.
        </p>
        <p>
          For more details as to how we will use and store your data, please see our
          <a onClick={privacy}> Privacy Statement</a>.
        </p>
        <h1>
          What happens to the data collected during the Project
        </h1>
        <p>
          The findings from the Project will be used to write a research paper about what happened during the Project.   The research paper will not contain any personal information.  The data on which the research paper will be based will then be deleted after 1 month. The paper will be shared with Edinburgh University and Social Bite who may use the paper to conduct further research and/or analysis.
        </p>
        <h1>
          What happens to the photos posted on deedit.org during the Project
        </h1>
        <p>
          You are given a choice whether to post a photo or agree to a pledge to confirm your deed has been completed.  It is not mandatory to post a photo.  Photos which are posted will be screened for appropriateness and suitable content.  Photos will be visible publicly in the 'Design Informatics Pavilion' on a tv screen as part of the Project, and will be visible on the web app.  By 30 September 2018 all data and photos collected during the Edinburgh festival will be deleted.
        </p>
        <h1>
          Your Commitments
        </h1>
        <p>
          We want the Project to be as open and inclusive as possible, but we also want it to be safe, secure and in accordance with the law. Anyone can participate, but if you are under 13 years old, you will need the permission of your parent/guardian before participating.
        </p>
        <h1>
          How You Can't Use Deedit.
        </h1>
        <p>
          For the Project to be enjoyed by a broad community, whilst also ensuring it is safe, we all need to do our part.
          <ul>
            <li>You can't do anything unlawful, misleading, or fraudulent or for an illegal or unauthorised purpose</li>
            <li>You can’t use a username that has profanities in it</li>
            <li>You can’t post photographs that have unsuitable content or profanities</li>
            <li>You can't violate (or help or encourage others to violate) these Terms of Use</li>
            <li>You can't do anything to interfere with or impair the intended operation of the Project</li>
            <li>You can't post private or confidential information or do anything that violates someone else's rights</li>
            <li>You can't post a picture of someone else, unless you have their permission.</li>
          </ul>
        </p>
        <h1>
          Permissions You Give to Us
        </h1>
        <p>
          You give us permission to show your username, deeds completed, and pictures you post on deedit.org and on the 'wonderwall' display in the Design Informatics Pavilion.
        </p>
        <h1>
          Additional Rights We Retain
        </h1>
        <ul>
          <li>If you select a nickname that is offensive or contains profanities we will delete it</li>
          <li>If you post a photograph which is offensive or unsuitable we will not post it to the public wall and we will delete it</li>
          <li>We can remove any content or information you share on deedit.org if we believe it violates these Terms of Use.</li>
        </ul>
        <h1>
          Hyperlinks and third party sites
        </h1>
        <p>
          deedit.org may contain hyperlinks or references to third party websites (such as social-bite.co.uk).  We have no control over third party websites and accept no responsibility for their content or material.  Your use of a third party site may be governed by the terms and conditions of that third party site.
        </p>
        <p>
          Some deeds are organised by third parties (such as 'Sleep in the Park', which is organised by Social Bite).  Such events are subject to separate terms and conditions which you must adhere to.  You should contact the organiser of the event if you have any queries about such separate terms and conditions.
        </p>
        <h1>
        Disputes
        </h1>
        <p>
          We will try to resolve any disputes with you quickly and efficiently.  If you are unhappy with us please contact us as soon as possible using the contact details below.  If we cannot resolve your dispute and you want to take court proceedings, the relevant courts of the United Kingdom will have exclusive jurisdiction in relation to these Terms.  Relevant United Kingdom law will apply to these Terms of Use.
        </p>
        <h1>
          Contact Us
          <EasterEgg onClick={badge.bind(null, {src: 'EasterEgg_Legal_Beagle'})} />
        </h1>
        <p>
          Please contact us at <a href='mailto:{emailAddress}'>{emailAddress}</a> or&nbsp;call&nbsp;0345&nbsp;0716155
        </p>
      </div>
      <Back back={props.back} />
    </div>
  );
}

export default TermsAndConditions;
