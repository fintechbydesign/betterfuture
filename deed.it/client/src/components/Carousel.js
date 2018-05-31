import React from 'react';
import NukaCarousel from 'nuka-carousel';
import BoxThumbnail from './BoxThumbnail';
import ImageThumbnail from './ImageThumbnail';
import './Carousel.css';

const left = '<';
const right = '>';

const renderImageThumbnails = (thumbnails) => ({currentSlide}) => {
  const thumbNails = thumbnails.map((thumbnail, index) => {
    return (<ImageThumbnail src={thumbnail} active={(currentSlide === index)} key={index}/>);
  });
  return (
    <div>
      {thumbNails}
    </div>
  );
};

const renderBoxThumbnails = (thumbnails) => ({currentSlide}) => {
  const thumbNails = thumbnails.map((thumbnail, index) => {
    return (<BoxThumbnail active={(currentSlide === index)} key={index}/>);
  });
  return (
    <div>
      {thumbNails}
    </div>
  );
};

function Carousel (props) {
  const { boxThumbnails, imageThumbnails } = props;
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
    nukaProps.renderBottomCenterControls = renderBoxThumbnails(boxThumbnails);
  }
  if (imageThumbnails) {
    nukaProps.renderBottomCenterControls = renderImageThumbnails(imageThumbnails);
  }
  return (
    <NukaCarousel {...nukaProps} >
      {props.slides}
    </NukaCarousel>
  );
}

export default Carousel;
