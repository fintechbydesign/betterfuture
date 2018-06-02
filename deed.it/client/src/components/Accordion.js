import React from 'react';
import Collapse from 'rc-collapse';
import './Accordion.css';
const Panel = Collapse.Panel;

function Accordion (props) {
  const { defaultActiveKey, onChange, panels} = props;
  const renderedPanels = panels.map((panel, index) => {
    const { header, className, headerClass, content } = panel;
    const panelProps = {
      key: index,
      header,
      className,
      headerClass
    }
    return (<Panel {...panelProps} showArrow >{content}</Panel>);
  });

  return (
    <Collapse accordion defaultActiveKey={defaultActiveKey} onChange={onChange} >
      {renderedPanels}
    </Collapse>
  );
}

export default Accordion;
