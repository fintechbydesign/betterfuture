import React from 'react';
import QRCode from 'qrcode-react';
import Button from '../components/Button.js';
import Title from '../components/Title.js';
import Instruction from '../components/Instruction.js';
import { updateUser } from '../stores/user';

function ShowWallet (props) {
  const donate = () => {
    props.user.wallet = 0;
    updateUser(props.user);
    props.welcomeBack();
  };
  return (
    <div>
      <Title text='Choose how to spend you rearned betties!' />
      <Instruction text={`You have saved up ${props.user.wallet} betties.  Use the QC code to spend them or donate them to a mega-deed.`} />
      <QRCode value={props.user.id} />
      <div>
        <Button click={donate} text='Donate to mega-deed.' />
      </div>
      <div>
        <Button click={props.welcomeBack} text='Back to summary' />
      </div>
    </div>
  );
}

export default ShowWallet;
