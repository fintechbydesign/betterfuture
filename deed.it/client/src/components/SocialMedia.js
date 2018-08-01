import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import './SocialMedia.css';

const facebookProps = {
  url: 'https://www.deedit.org',
  msg:"I’ve deed it for Edinburgh. You can too at www.deedit.org."
};

const twitterProps = {
  url: 'https://www.deedit.org',
  title:"I’ve deed it for Edinburgh. You can too at "
};

const whatsappProps = {
  url: 'https://www.deedit.org',
  title:"I’ve deed it for Edinburgh. You can too at "
};

const iconProps = { size: 32, round: true };

function SocialMedia () {

  return (
    <div className='SocialMedia_container flexContainerRow'>
      <FacebookShareButton {...facebookProps} >
        <div className='SocialMedia_facebook flexContainerRow'>
          <FacebookIcon {...iconProps} />
          <div>share</div>
        </div>
      </FacebookShareButton>
      <TwitterShareButton {...twitterProps} >
        <div className='SocialMedia_twitter flexContainerRow'>
        <TwitterIcon {...iconProps} />
          <div>tweet</div>
        </div>
      </TwitterShareButton>
      <WhatsappShareButton {...whatsappProps} >
        <div className='SocialMedia_whatsapp flexContainerRow'>
        <WhatsappIcon {...iconProps} />
          <div>chat</div>
        </div>
      </WhatsappShareButton>
    </div>
  );
}

export default SocialMedia;
