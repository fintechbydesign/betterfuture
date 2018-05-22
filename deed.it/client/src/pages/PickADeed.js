import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Image from '../components/Image';
import Fetching from '../components/Fetching';
import { getDeedHierarchy } from '../data/deeds';
import { updateCurrentDeed } from '../stores/user';
import { selected } from '../stores/deedStatus';
import './PickADeed.css';

const methods = ['renderDeedType', 'renderSuperDeed', 'selectDeedType', 'selectSuperDeed', 'startDeed'];


class PickADeed extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      superDeeds: undefined,
      selectedSuperDeed: undefined,
      selectedDeedType: undefined
    };
  }

  async componentDidMount () {
    try {
      const superDeeds = await getDeedHierarchy()
      this.setState({
        ...this.state,
        superDeeds,
        selectedSuperDeed: superDeeds[0],
        selectedDeedType: superDeeds[0].deedTypes[0]
      });
    } catch (err) {
      this.props.error(err);
    }
  }

  selectSuperDeed (selectedSuperDeed) {
    this.setState({
      ...this.state,
      selectedSuperDeed
    });
  }

  selectDeedType (selectedDeedType) {
    this.setState({
      ...this.state,
      selectedDeedType
    });
  }

  startDeed () {
    const { selectedDeedType: deed, selectedSuperDeed: superDeed } = this.state;
    updateCurrentDeed({
      superDeed,
      deed,
      status: selected
    });
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
    const sections = this.state.superDeeds.map((superDeed) => ({
      content: this.renderSuperDeed(superDeed),
      label: superDeed.superDeed,
      selected: this.selectSuperDeed.bind(this, superDeed)
    }));
    return (
      <div>
        <Accordion sections={sections}/>
      </div>
    );
  }
}

export default PickADeed;