import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Image from '../components/Image';
import Fetching from '../components/Fetching';
import { getDeeds } from '../stores/deeds';
import { updateCurrentDeed } from '../stores/user';
import { selected } from '../stores/deedStatus';
import './PickADeed.css';

const methods = ['renderDeed', 'renderMegaDeed', 'selectDeed', 'selectMegaDeed', 'startDeed'];


class PickADeed extends Component {

  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      deeds: undefined,
      selectedMegaDeed: undefined,
      selectedDeed: undefined
    };
  }

  async componentDidMount () {
    try {
      const deeds = await getDeeds();
      this.setState({
        ...this.state,
        deeds,
        selectedMegaDeed: deeds[0],
        selectedDeed: deeds[0].deeds[0]
      });
    } catch (err) {
      this.props.error(err);
    }
  }

  selectMegaDeed (selectedMegaDeed) {
    this.setState({
      ...this.state,
      selectedMegaDeed
    });
  }

  selectDeed (selectedDeed) {
    this.setState({
      ...this.state,
      selectedDeed
    });
  }

  startDeed () {
    const { selectedDeed: deed, selectedMegaDeed: megaDeed } = this.state;
    updateCurrentDeed({
      megaDeed,
      deed,
      status: selected
    });
    this.props.startDeed();
  }

  // the innder div is there to fix the height whilst the image is dynamically changed
  renderDeed (deed, index) {
    return (
      <div key={index}>
        <div className='PickADeed-image-container'>
          <Image src={deed.image} />
        </div>
        <p>{deed.name}</p>
      </div>
    );
  }

  renderMegaDeed (megaDeed) {
    const slides = megaDeed.deeds.map((deed, index) => this.renderDeed(deed, index));
    const thumbnails = megaDeed.deeds.map((deed) => deed.image);
    const selected = (index) => this.selectDeed(megaDeed.deeds[index]);
    return (
      <div>
        <p>{megaDeed.description}</p>
        <Carousel selected={selected} slides={slides} thumbnails={thumbnails} />
        <Button text='Find out more >' click={this.startDeed} />
      </div>
    );
  }

  render () {
    if (!this.state.deeds) {
      return ( <Fetching text='Fetching available deeds' />);
    }
    const sections = this.state.deeds.map((megaDeed) => ({
      content: this.renderMegaDeed(megaDeed),
      label: megaDeed.name,
      selected: this.selectMegaDeed.bind(this, megaDeed)
    }));
    return (
      <div>
        <Accordion sections={sections}/>
      </div>
    );
  }
}

export default PickADeed;