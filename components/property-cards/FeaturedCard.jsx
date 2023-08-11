"use client";
import { H2, H3, Para } from "@/styles/StyledTypography";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

function FeaturedCard({ address, city, state, rent, revShare, images }) {
  return (
    <Wrapper>
      <ImageGrid>
        {images?.map((image) => (
          <ImageItem key={image}>
            <Image
              src={image}
              alt=""
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </ImageItem>
        ))}
      </ImageGrid>
      <ContentGrid>
        <AddressItem>
          <H3>{address}</H3>
          <Para grey>
            {city}, {state}
          </Para>
        </AddressItem>
        <NumbersItem>
          <RentWrapper>
            <Para grey>Rent</Para>
            <H3>${rent}</H3>
          </RentWrapper>
          <RevShareWrapper>
            <Para grey>Revenue Share</Para>
            <H3>{revShare}%</H3>
          </RevShareWrapper>
        </NumbersItem>
      </ContentGrid>
    </Wrapper>
  );
}

export default FeaturedCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
  height: 600px;
  background-color: ${({ theme }) => theme?.colors?.white};
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    cursor: pointer;
    padding: 9px;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 12px;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  position: relative;
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ImageItem = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: auto;
  grid-row-gap: 15px;
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const AddressItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const NumbersItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding-left: 10px;
  @media screen and (max-width: 760px) {
    padding: 0px;
  }
`;

const RentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RevShareWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
