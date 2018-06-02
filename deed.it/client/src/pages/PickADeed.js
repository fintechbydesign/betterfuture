import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Image from '../components/Image';
import Fetching from '../components/Fetching';
import superDeedStyling from '../components/superDeed';
import { getDeedHierarchy } from '../data/deeds';
import { updateLocalUser} from '../data/user';
import './PickADeed.css';

const methods = ['fetchDeeds', 'renderDeedType', 'renderSuperDeed', 'setSelected', 'selectDeed'];

class PickADeed extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      deedHierarchy: null
    };
    // 'selected' not in state as Accordion/Carousel not correctly redrawing when it is set
    this.selected = {
      superDeed: null,
      deedType: null
    };
  }

  componentDidMount () {
    const { deedHierarchy } = this.state;
    if (!deedHierarchy) {
      this.fetchDeeds();
    }
  }

  async fetchDeeds () {
    try {
      const deedHierarchy = await getDeedHierarchy();
      console.log('pickADeed', 'fetchDeeds', deedHierarchy);
      this.setSelected(deedHierarchy[0], deedHierarchy[0].deedTypes[0]);
      this.setState({
        ...this.state,
        deedHierarchy
      });
    } catch (err) {
      this.props.error({err});
    }
  }

  setSelected (superDeed, deedType) {
    console.log('setSelected', superDeed, deedType);
    this.selected = {
      ...this.selected,
      superDeed,
      deedType
    };
  }

  selectDeed () {
    const user = {
      ...this.props.user,
      selected: this.selected
    };
    updateLocalUser(user);
    this.props.startDeed();
  }

  // the inner div is there to fix the height whilst the image is dynamically changed
  renderDeedType (deedType, index, callout) {
    return (
      <div key={index} className='PickADeed-slide-container'>
        {callout}
        <div className='PickADeed-image-container'>
          <Image src={deedType.image} />
        </div>
        <div className='PickADeed-description'>{deedType.description}</div>
        <Button text='Find out more >' click={this.selectDeed} />
      </div>
    );
  }

  renderSuperDeed (superDeed, index) {
    const { callout } = superDeedStyling[index];
    const slides = superDeed.deedTypes.map((deedType, index) => this.renderDeedType(deedType, index, callout));
    const thumbnails = superDeed.deedTypes.map(() => ({}));
    const selected = (index) => this.setSelected(superDeed, superDeed.deedTypes[index]);
    return (
      <div>
        <div className='PickADeed-description'>{superDeed.description}</div>
        <Carousel selected={selected} slides={slides} boxThumbnails={thumbnails} />
      </div>
    );
  }

  render () {
    const { deedHierarchy } = this.state;
    if (!deedHierarchy) {
      return (<Fetching text='Fetching available deeds' />);
    }
    const panels = deedHierarchy.map((superDeed, index) => ({
      content: this.renderSuperDeed(superDeed, index),
      header: superDeed.id,
      className: `PickADeed-panel ${superDeedStyling[index].className}`,
      headerClass: `PickADeed-header ${superDeedStyling[index].className}`
    }));
    const onChange = (index) => {
      // bug (?) in Collapse that allows undefined active key to be passed
      if (typeof index !== 'undefined') {
        this.setSelected(deedHierarchy[index], deedHierarchy[index].deedTypes[0]);
      }
    };
    const defaultActiveKey = String(2);
    /*
    const activeKey = this.selected.superDeed
      ? deedHierarchy.findIndex((superdeed) => superdeed === this.selected.superDeed)
      : 2;
      */
    const accordionProps = { defaultActiveKey, onChange, panels }
    return (
      <div>
        <Accordion {...accordionProps} />
      </div>
    );
  }
}

export default PickADeed;
