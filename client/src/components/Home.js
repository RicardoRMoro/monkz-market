import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../App.css' 
import slide1 from '../imgs/slide1.png'
import slide2 from '../imgs/slide2.png'
import slide3 from '../imgs/slide3.png'

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <div>
      <Slider {...settings} className="slider">
        <div>
          <img src={slide1} alt="Slide 1" />
        </div>
        <div>
          <img src={slide2} alt="Slide 2" />
        </div>
        <div>
          <img src={slide3} alt="Slide 3" />
        </div>
      </Slider>
      <div className="section section1">
        {/* Conteúdo da primeira seção */}
      </div>
      <div className="section section2">
        {/* Conteúdo da segunda seção */}
      </div>
    </div>
  )
}

export default Home;
