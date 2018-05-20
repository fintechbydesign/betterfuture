import React from 'react';
import NukaCarousel from 'nuka-carousel';
import Thumbnail from './Thumbnail';

function Carousel (props) {
  const nukaProps = {
    afterSlide: props.selected,
    dragging: true,
    heightMode:'max',
    swiping: true
  };
  if (props.thumbnails) {
    nukaProps.renderBottomCenterControls = ({currentSlide}) => {
      const thumbNails = props.thumbnails.map((thumbnail, index) => {
        return (<Thumbnail src={thumbnail} active={(currentSlide === index)} key={index} />);
      });
      return (
        <div>
          {thumbNails}
        </div>
      );
    }
  }
  return (
    <NukaCarousel {...nukaProps} >
      {props.slides}
    </NukaCarousel>
  );
}

export default Carousel;