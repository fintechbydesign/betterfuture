import React, { Component } from 'react';
import QRCode from 'qrcode-react';
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Instruction from '../components/Instruction.js';
import { getUser, setUserProps } from '../stores/user.js';

class ShowWallet extends Component { 
  
  render() {
    const donate = () => {
      setUserProps({ wallet: 0 });
      this.props.back();
    };
    return (
      <div>
        <Header text='Choose how to spend you rearned betties!' />
        <Instruction text={`You have saved up ${getUser().wallet} betties.  Use the QC code to spend them or donate them to a mega-deed.`} />
        <QRCode value={getUser().id} />
        <div>
          <Button click={donate} text='Donate to mega-deed.' />
        </div>
        <div>
          <Button click={this.props.back} text='Back to summary' />
        </div>
      </div>
    );
  }
}

export default ShowWallet;
