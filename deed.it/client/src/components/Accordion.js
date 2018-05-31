import React from 'react';
import Collapse from 'rc-collapse';
import './Accordion.css';
const Panel = Collapse.Panel;

function Accordion (props) {
  const panels = props.panels.map((panel, index) => {
    const { label, className, headerClass, content } = panel;
    const props = {
      key: index,
      header: label,
      className,
      headerClass
    }
    return (<Panel {...props} showArrow >{content}</Panel>);
  });

  return (
    <Collapse accordion onChange={props.onChange} >
      {panels}
    </Collapse>
  );
}

export default Accordion;
