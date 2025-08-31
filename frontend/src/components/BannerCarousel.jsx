import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./BannerWithPhotos.css"; // import your CSS

import banner1 from "../assets/camerabanner.jpg";
import banner2 from "../assets/offerbanner.jpg";
import banner3 from "../assets/Furniturebanner.jpg";
import banner4 from "../assets/shoe.jpg";

const banners = [banner1, banner2, banner3, banner4];

const BannerCarousel= () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };


  return (
    <div className="banner-container">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={idx}>
            <img
              src={banner}
              alt={`Banner ${idx + 1}`}
              className="banner-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
