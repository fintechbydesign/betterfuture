import React, { Component } from 'react';
import Slider from "react-slick";
import './Carousel.css';
// import './slick.css';
// import './slick-theme.css';

const speed = 500;

class Carousel extends Component {

  constructor (props) {
    super(props);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.state = {
      animate: props.animate
    }
  }

  stopAnimation () {
    this.setState({
      ...this.state,
      animate: false
    })
  }

  render() {
    const { selected, slides, ...theRest } = this.props;
    const { animate } = this.state;
    const sliderProps = {
      ...theRest,
      afterChange: selected,
      arrows: false,
      dots: true,
      infinite: true,
      speed,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    if (animate) {
      sliderProps.autoplay = true;
      sliderProps.autoplaySpeed = 0;
      setTimeout( this.stopAnimation, (speed * slides.length));
    }
    return (
      <Slider {...sliderProps} >
        {slides}
      </Slider>
    );
  }
}

export default Carousel;
