import React from 'react';
import NukaCarousel from 'nuka-carousel';
import BoxThumbnail from './BoxThumbnail';
import CircleThumbnail from './CircleThumbnail';
import ImageThumbnail from './ImageThumbnail';
import './Carousel.css';

const left = '<';
const right = '>';

const renderThumbnails = (thumbnails, ThumbnailClass) => ({currentSlide}) => {
  const thumbNails = thumbnails.map((thumbnail, index) => {
    return (<ThumbnailClass active={(currentSlide === index)} key={index}/>);
  });
  return (
    <div>
      {thumbNails}
    </div>
  );
};

function Carousel (props) {
  const { boxThumbnails, circleThumbnails, imageThumbnails } = props;
  const nukaProps = {
    afterSlide: props.selected,
    dragging: true,
    heightMode: 'current',
    initialSlideHeight: 200,
    swiping: true
  };
  nukaProps.renderCenterLeftControls = ({ previousSlide }) => (
    <button className='Carousel-nav-button' onClick={previousSlide}>{left}</button>
  );
  nukaProps.renderCenterRightControls= ({ nextSlide }) => (
    <button className='Carousel-nav-button'onClick={nextSlide}>{right}</button>
  );
  if (boxThumbnails) {
    nukaProps.renderBottomCenterControls = renderThumbnails(boxThumbnails, BoxThumbnail);
  }
  if (circleThumbnails) {
    nukaProps.renderBottomCenterControls = renderThumbnails(circleThumbnails, CircleThumbnail);
  }
  if (imageThumbnails) {
    nukaProps.renderBottomCenterControls = renderThumbnails(imageThumbnails, ImageThumbnail);
  }
  return (
    <NukaCarousel {...nukaProps} >
      {props.slides}
    </NukaCarousel>
  );
}

export default Carousel;
