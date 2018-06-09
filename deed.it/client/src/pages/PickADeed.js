import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Image from '../components/Image';
import Fetching from '../components/Fetching';
import superDeedStyling from '../components/superDeed';
import Text from '../components/Text';
import { getDeedHierarchy } from '../data/deeds';
import { updateLocalUser} from '../data/user';
import './PickADeed.css';

const methods = ['fetchDeeds', 'renderDeedType', 'renderSuperDeed', 'setSelected', 'selectDeed'];

const randomTextProps = {
  count: 3,
  units: 'sentences',
  format: 'plain'
};

class PickADeed extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      deedHierarchy: null,
      selected: null
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
      this.setState({
        ...this.state,
        deedHierarchy
      });
    } catch (err) {
      this.props.error({err});
    }
  }

  setSelected (superDeed, deedType) {
    const selected = (superDeed && deedType) ? { superDeed, deedType } : null;
    this.setState({
      ...this.state,
      selected
    });
  }

  selectDeed () {
    const user = {
      ...this.props.user,
      selected: this.state.selected
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
    const { deedHierarchy, selected } = this.state;
    if (!deedHierarchy) {
      return (<Fetching text='Fetching available deeds' />);
    }
    const textClassName = (selected) ? 'PickADeed-text-hidden' : 'PickADeed-text';
    const panels = deedHierarchy.map((superDeed, index) => ({
      content: this.renderSuperDeed(superDeed, index),
      header: superDeed.id,
      className: `PickADeed-panel ${superDeedStyling[index].className}`,
      headerClass: `PickADeed-header ${superDeedStyling[index].className}`
    }));
    const onChange = (index) => {
      if (typeof index === 'undefined') {
        this.setSelected();
      } else {
        this.setSelected(deedHierarchy[index], deedHierarchy[index].deedTypes[0]);
      }
    };
    const accordionProps = { onChange, panels }
    return (
      <div>
        <Text className={textClassName} dummyText={randomTextProps} />
        <Accordion {...accordionProps} />
      </div>
    );
  }
}

export default PickADeed;
