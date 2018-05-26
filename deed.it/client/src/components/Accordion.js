import React from 'react';
import Collapse from 'rc-collapse';
import './Accordion.css';
const Panel = Collapse.Panel;

function Accordion (props) {
  const panels = props.panels.map((panel, index) => {
    return (<Panel key={index} header={panel.label} showArrow >{panel.content}</Panel>);
  });

  return (
    <Collapse accordion onChange={props.onChange} >
      {panels}
    </Collapse>
  );
}

export default Accordion;
