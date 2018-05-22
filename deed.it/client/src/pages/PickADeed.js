import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Image from '../components/Image';
import Fetching from '../components/Fetching';
import { getDeedHierarchy } from '../data/deeds';
import { updateCurrentDeed } from '../stores/user';
import './PickADeed.css';

const methods = ['renderDeedType', 'renderSuperDeed', 'selectDeedType', 'selectSuperDeed', 'startDeed'];


class PickADeed extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      superDeeds: undefined,
    };
    this.selected = {
      superDeed: undefined,
      deedType: undefined
    }
  }

  async componentDidMount () {
    try {
      const superDeeds = await getDeedHierarchy();
      this.selected = {
        ...this.selected,
        superDeed: superDeeds[0],
        deedType: superDeeds[0].deedTypes[0]
      };
      this.setState({
        ...this.state,
        superDeeds,
      });
    } catch (err) {
      this.props.error(err);
    }
  }

  selectSuperDeed (superDeed) {
    this.selected = { ...this.selected, superDeed };
  }

  selectDeedType (deedType) {
    this.selected = { ...this.selected, deedType };
  }

  startDeed () {
    updateCurrentDeed( this.selected );
    this.props.startDeed();
  }

  // the inner div is there to fix the height whilst the image is dynamically changed
  renderDeedType (deedType, index) {
    return (
      <div key={index} className='PickADeed-slide-container'>
        <div className='PickADeed-image-container'>
          <Image src={deedType.image} />
        </div>
        <p>{deedType.description}</p>
      </div>
    );
  }

  renderSuperDeed (superDeed) {
    const slides = superDeed.deedTypes.map((deedType, index) => this.renderDeedType(deedType, index));
    const thumbnails = superDeed.deedTypes.map((deedType) => deedType.image);
    const selected = (index) => this.selectDeedType(superDeed.deedTypes[index]);
    return (
      <div>
        <p>{superDeed.description}</p>
        <Carousel selected={selected} slides={slides} thumbnails={thumbnails} />
        <Button text='Find out more >' click={this.startDeed} />
      </div>
    );
  }

  render () {
    if (!this.state.superDeeds) {
      return ( <Fetching text='Fetching available deeds' />);
    }
    const panels = this.state.superDeeds.map((superDeed) => ({
      content: this.renderSuperDeed(superDeed),
      label: superDeed.superDeed
    }));
    const onChange = (index) => this.selectSuperDeed(this.state.superDeeds[index]);
    return (
      <div>
        <Accordion panels={panels} onChange={onChange} />
      </div>
    );
  }
}

export default PickADeed;