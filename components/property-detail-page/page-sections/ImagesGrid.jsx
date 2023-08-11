"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "@/components/common/Button";

function ImagesGrid({ images, onClick }) {

  return (
    <>
      <ImageGrid>
        {images?.map((item) => (
          <div key={item} style={{ overflow: "hidden" }}>
            <ImageWrapper>
              <Image
                alt="property-image"
                src={item}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </ImageWrapper>
          </div>
        ))}
        <Button
          hoverAnimate
          white
          style={{ position: "absolute", bottom: "0", right: "0", margin: "0px 30px 30px 0px"}}
          onClick={onClick}
        >
          See All Photos
        </Button>
      </ImageGrid>
    </>
  );
}

export default ImagesGrid;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
  margin-bottom: 40px;
  height: 600px;
  width: 100%;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 1000px){
    grid-template-columns: 1fr;
    height: 400px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.5s transform cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
