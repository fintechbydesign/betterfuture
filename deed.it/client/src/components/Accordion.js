import React from 'react';
import './Accordion.css';

function Section (props) {
  const id = `ac-${props.index}`;
  const checked = (props.index === 0);
  return (
    <div>
      <input id={id} name="accordion" type="radio" defaultChecked={checked} onChange={props.selected} />
      <label htmlFor={id}>{props.label}</label>
      <article>
        {props.content}
      </article>
    </div>
  );
}

function Accordion (props) {

  const sections = props.sections.map((section, index) => {
    const props = {key: index, index, ...section};
    return (<Section {...props} />)
  });

  return (
    <section className="Accordion-container">
      {sections}
    </section>
  );
}

export default Accordion;