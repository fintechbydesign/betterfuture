import React, { Component } from 'react';
import Button from '../components/Button';
import Image from './Image';
import { approve, disapprove } from "../data/approvals";
import './Admin.css';

class Admin extends Component {

  constructor (props) {
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = { hidden: true };
  }

  show () {
    this.setState({ hidden: false });
  }

  hide () {
    this.setState({ hidden: true });
  }

  render () {
    const { deedId } = this.props;
    const { hidden } = this.state;
    const className = hidden ? 'Admin_Hide' : 'Admin_Show';
    const imgProps = {...this.props, alt: 'unapproved evidence', showParent: this.show };
    const approveClicked = async() => {
      await approve(deedId);
      this.hide();
    };
    const disapproveClicked = async() => {
      await disapprove(deedId);
      this.hide();
    };
    return (
      <div className={className} >
        <Image {...imgProps} />
        <div className='Admin_ButtonRow'>
          <Button text='Approve :-)' click={approveClicked} className='Admin_Approve'/>
          <Button text='Disapprove >:-(' click={disapproveClicked} className='Admin_Disapprove'/>
        </div>
      </div>
    );
  }
}

export default Admin;
