"use client";
import React from "react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import styled from "styled-components";
import ImageSliderThumbs from "../image-slider/ImageSliderThumbs";

function ImageSlider({ open, images, onClick }) {

  return (
    <>
      {open && (
        <SliderOverlay onClick={onClick}>
            <ImageSliderThumbs images={images}/>
        </SliderOverlay>
      )}
    </>
  );
}

export default ImageSlider;

const SliderOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000000ec;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
