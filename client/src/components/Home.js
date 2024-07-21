import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/App.css' 
import '../styles/slider.css' 
import slide1 from '../imgs/slide1.png'
import slide2 from '../imgs/slide2.png'
import slide3 from '../imgs/slide3.png'

function Home() {
  const slides = [
    {
      image: slide1,
      title: 'Pica 1',
      text: 'Você merece muita pica 1',
    },
    {
      image: slide2,
      title: 'Pica 2',
      text: 'Você merece muita pica 2',
    },
    {
      image: slide3,
      title: 'Pica 3',
      text: 'Você merece muita pica 3',
    },
  ]

  const settings = {
    fade: true,
    swipe: true,
    touchMove: true,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }


  return (
    <div>
        <div className='homebg'>
          {/* <Slider {...settings} className="slider">
            {slides.map((slide, index) => (
              <div key={index}>
                <div className="slide-content">
                  <div className="slide-text">
                    <h2>{slide.title}</h2>
                    <p>{slide.text}</p>
                  </div>
                  <img src={slide.image} alt={`Slide ${index + 1}`} />
                </div>
              </div>
            ))}
          </Slider> */}
        </div>
    </div>
  )
}

export default Home;
