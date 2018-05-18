import React, { Component } from 'react';
import Accordion from '../components/Accordion';
import Text from '../components/Text';
import { getDeeds } from '../stores/deeds.js';


class PickADeed extends Component {

  render() {
    const sections = getDeeds().map((megaDeed) => ({
      label: megaDeed.name,
      content: (<p>{megaDeed.description}</p>)
    }));
    return (
      <div>
        <Accordion sections={sections} />
      </div>
    );
  }
}

export default PickADeed;
