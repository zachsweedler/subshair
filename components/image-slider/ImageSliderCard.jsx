"use client";
import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "./MySwiper.scss";

function ImageSliderCard({ images, onClick }) {
  
  const defaultImage =
    "/assets/images/default-property-image/default-property-image.svg";

  return (
    <div onClick={onClick} style={{width: '100%'}}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        watchSlidesProgress
        navigation
        style={{
          display: "flex",
          width: "100%",
          height: "250px",
          overflow: "hidden",
          position: "absolute",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        {images?.length > 0 ? (
          images?.map((item) => (
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
          ))
        ) : (
            <SwiperSlide style={{ width: "100%", position: "relative" }}>
              <Image
                alt="selected-property-images"
                src={defaultImage}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default ImageSliderCard;
