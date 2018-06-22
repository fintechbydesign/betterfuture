import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Carousel from '../components/Carousel';
import DeedTypeSummary from '../components/DeedTypeSummary';
import ProgressBar from '../components/ProgressBar';
import startDeed from '../components/startDeed';
import Title from '../components/Title';
import Text from '../components/Text';
import { getDeedHierarchy } from '../data/deeds';
import './PickADeed.css';

const methods = ['fetchDeeds', 'renderDeedType', 'renderSuperDeed', 'setSelected', 'selectDeed'];

class PickADeed extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      deedHierarchy: null,
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
      this.setState({
        ...this.state,
        deedHierarchy
      });
    } catch (err) {
      this.props.error({err});
    }
  }

  setSelected (deedType) {
    this.setState({
      ...this.state,
      deedType
    });
  }

  selectDeed () {
    const {  error, myProfile, register, user } = this.props;
    const { registered } = user;
    const { deedType } = this.state;
    if (registered) {
      startDeed(user, deedType, { error, myProfile });
    } else {
      register({ deedType });
    }
  }

  renderDeedType (deedType, index) {
    const props = {
      buttonText:'Do this deed',
      deedType,
      key: index,
      onClick: this.selectDeed
    };
    // note additional div as Carousel adds 'display-block' to outside div
    return (
      <div>
        <div className='flexContainerRow'>
          <div>&nbsp;</div>
          <DeedTypeSummary {...props} />
          <div>&nbsp;</div>
        </div>
      </div>
    );
  }

  renderSuperDeed (superDeed, index) {
    const slides = superDeed.deedTypes.map((deedType, index) => this.renderDeedType(deedType, index));
    const selected = (index) => this.setSelected(superDeed.deedTypes[index]);
    const props = { selected, slides };
    return (
      <Carousel {...props} />
    );
  }

  render () {
    const { deedHierarchy, deedType } = this.state;
    if (!deedHierarchy) {
      const progressProps = {
        duration: 3000,
        style: {
          fontSize: 'large'
        },
        text: 'Fetching available deeds...'
      };
      return (<ProgressBar { ...progressProps } />);
    }
    const titleText = (deedType) ? 'Pick A Deed' : 'Pick A Mega Deed';
    const introClassName = (deedType) ? 'hidden' : 'PickADeed-intro';
    const items = deedHierarchy.map((superDeed, index) => ({
      content: this.renderSuperDeed(superDeed, index),
      title: superDeed.id,
      className: 'PickADeed-root',
      bodyClassName: `PickADeed-body ${superDeed.style.className}`,
      titleClassName: `PickADeed-header ${superDeed.style.className}`
    }));
    const onChange = ({activeItems}) => {
      if(activeItems.length) {
        const index = activeItems[0];
        this.setSelected(deedHierarchy[index].deedTypes[0]);
      } else {
        this.setSelected();
      }
    };
    const accordionProps = { items, onChange }
    return (
      <div className="page flexContainerColumn">
        <Title text={titleText}  className='PickADeed-title' />
        <div className={introClassName}>
          <Text text='Together we can tackle 3 big issues in Edinburgh.' />
          <Text text="How? By getting involved you are collectively taking action towards improving Edinburgh's people and places." />
          <Text text='Choose the mega deed you want to contribute to:' />
        </div>
        <div className="PickADeed-accordion-container">
          <Accordion {...accordionProps} />
        </div>
      </div>
    );
  }
}

export default PickADeed;
