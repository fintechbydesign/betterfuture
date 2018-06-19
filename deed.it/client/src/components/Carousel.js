import React from 'react';
import Slider from "react-slick";
import './Carousel.css';
// import './slick.css';
// import './slick-theme.css';

const defaultProps = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const defaultAnimateProps = {
  autoplay: true,
  autoplaySpeed: 0
}

function Carousel (props) {
  const { animate, selected, slides, ...theRest } = props;
  const animateProps = (animate) ? defaultAnimateProps : {};
  const sliderProps = {
    ...defaultProps,
    ...animateProps,
    ...theRest,
    afterChange: selected
  }
  return (
    <Slider {...sliderProps} >
      {slides}
    </Slider>
  );
}

export default Carousel;