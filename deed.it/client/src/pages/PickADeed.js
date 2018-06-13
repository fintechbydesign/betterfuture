import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Carousel from '../components/Carousel';
import DeedTypeSummary from '../components/DeedTypeSummary';
import Fetching from '../components/Fetching';
import startDeed from '../components/startDeed';
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

  setSelected (deedType) {
    const selected = (deedType) ? { deedType } : null;
    this.setState({
      ...this.state,
      selected
    });
  }

  selectDeed () {
    const {  error, myProfile, register, uploading, user } = this.props;
    const { registered } = user;
    const { selected } = this.state;
    const updatedUser = { ...user, selected } ;
    if (registered) {
      startDeed(updatedUser, { error, myProfile, uploading });
    } else {
      updateLocalUser(updatedUser);
      register();
    }
  }

  renderDeedType (deedType, index) {
    const props = {
      buttonText:'Do this deed',
      deedType,
      key: index,
      onClick: this.selectDeed
    };
    return (<DeedTypeSummary {...props} />);
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
    const { deedHierarchy, selected } = this.state;
    if (!deedHierarchy) {
      return (<Fetching text='Fetching available deeds...' />);
    }
    const textClassName = (selected) ? 'hidden' : '';
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
