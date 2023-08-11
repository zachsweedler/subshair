"use client";
import React, { useCallback, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styled from "styled-components";

function ImageSliderThumbs({ images }) {
  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleSwiperClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <Wrapper onClick={handleSwiperClick}>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        style={{height: '600px', width: '100%', borderRadius: "5px"}}
      >
        {images?.map((item) => (
          <SwiperSlide
            key={item}
            style={{ width: "100%", position: "relative" }}
          >
            <Image
              alt="selected-property-images"
              src={item}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{ width: "100%", height: "150px" }}
      >
        {images?.map((item) => (
          <SwiperSlide
            key={item}
            style={{ width: "100%", position: "relative", borderRadius: "5px", overflow: "hidden" }}
          >
            <Image
              alt="selected-property-images"
              src={item}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

export default ImageSliderThumbs;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
    max-width: ${({theme})=> theme.container.width.lg};
    height: auto;
    overflow: hidden;
    z-index: 1000;
`;