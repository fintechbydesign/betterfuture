import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Image from '../components/Image';
import Fetching from '../components/Fetching';
import superDeedStyling from '../components/superDeed';
import Title from '../components/Title';
import Text from '../components/Text';
import { getDeedHierarchy } from '../data/deeds';
import { updateLocalUser} from '../data/user';
import './PickADeed.css';

const methods = ['fetchDeeds', 'renderDeedType', 'renderSuperDeed', 'setSelected', 'selectDeed'];

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
  renderDeedType (deedType, styling) {
    const { description, id } = deedType;
    const { color, icon } = styling;
    const style = { color };
    return (
      <div>
        <div className='PickADeed-image'>
          <Image src={icon} className='PickADeed-image' />
        </div>
        <Text text={id} className='PickADeed-bold' />
        <Text text={description} />
        <div className='PickADeed-callout' >
          <div className='PickADeed-when flexContainerRow'>
            <Text text='When' className='PickADeed-callout-text PickADeed-vertical' style={style} />
            <div>
              <Text text='Monday 6th' className='PickADeed-callout-text PickADeed-emphasis'/>
              <Text text='August 2018' className='PickADeed-callout-text'/>
            </div>
            <Text text='22:00' className='PickADeed-callout-text PickADeed-time'/>
          </div>
          <div className='PickADeed-where flexContainerRow'>
            <Text text='Where' className='PickADeed-callout-text PickADeed-vertical' style={style} />
            <div>
              <Text text='George Street' className='PickADeed-callout-text PickADeed-emphasis' />
              <Text text='Edinburgh' className='PickADeed-callout-text' />
            </div>
          </div>
        </div>
        <Button text='Do this deed' click={this.selectDeed} />
      </div>
    );
  }

  renderSuperDeed (superDeed, index) {
    const styling = superDeedStyling[index];
    const slides = superDeed.deedTypes.map((deedType, index) => this.renderDeedType(deedType, styling));
    const thumbnails = superDeed.deedTypes.map(() => ({}));
    const selected = (index) => this.setSelected(superDeed, superDeed.deedTypes[index]);
    return (
      <Carousel selected={selected} slides={slides} circleThumbnails={thumbnails} />
    );
  }

  render () {
    const { deedHierarchy, selected } = this.state;
    if (!deedHierarchy) {
      return (<Fetching text='Fetching available deeds...' />);
    }
    const textClassName = (selected) ? 'hidden' : 'PickADeed-text';
    const items = deedHierarchy.map((superDeed, index) => ({
      content: this.renderSuperDeed(superDeed, index),
      title: superDeed.id,
      className: 'PickADeed-root',
      bodyClassName: `PickADeed-body ${superDeedStyling[index].className}`,
      titleClassName: `PickADeed-header ${superDeedStyling[index].className}`
    }));
    const onChange = ({activeItems}) => {
      if(activeItems.length) {
        const index = activeItems[0];
        this.setSelected(deedHierarchy[index], deedHierarchy[index].deedTypes[0]);
      } else {
        this.setSelected();
      }
    };
    const accordionProps = { items, onChange }
    return (
      <div>
        <Title text='Pick A Deed' className='PickADeed-title' />
        <Text className={textClassName} text='Choose which megadeed you would like to contribute to.' />
        <Accordion {...accordionProps} />
      </div>
    );
  }
}

export default PickADeed;
