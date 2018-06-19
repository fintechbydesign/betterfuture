import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';

function MyAccordion (props) {
  const { items, onChange} = props;
  const accordionItems = items.map((item, index) => {
    const { bodyClassName, className, content, title, titleClassName } = item;
    const itemProps = {
      title,
      titleTag: 'div',
      className,
      bodyClassName,
      titleClassName
    }
    return (<AccordionItem {...itemProps} >{content}</AccordionItem>);
  });

  return (
    <Accordion onChange={onChange} >
      {accordionItems}
    </Accordion>
  );
}

export default MyAccordion;
