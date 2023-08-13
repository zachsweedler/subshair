"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styled from "styled-components";
import { ImageSliderButton } from "./ImageSliderButton";

function ImageSliderThumbs({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isDesktop, setIsDesktop] = useState()

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const handleSwiperClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <Wrapper onClick={handleSwiperClick}>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        spaceBetween={10}
        slidesPerView={1}
        style={{ height: "60vh", width: "100%", borderRadius: "5px" }}
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
        <ImageSliderButton direction="next" />
        <ImageSliderButton direction="prev" />
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={isDesktop ? 5 : 3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{ width: "100%", height: "10vh" }}
        className="mySwiper"
      >
        {images?.map((item) => (
          <SwiperSlide
            key={item}
            style={{
              width: "200px",
              position: "relative",
              borderRadius: "5px",
              overflow: "hidden",
              cursor: "pointer"
            }}
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
  max-width: ${({ theme }) => theme.container.width.md};
  height: auto;
  overflow: hidden;
  z-index: 1000;
  padding: 50px;
`;
