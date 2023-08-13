"use client";
import { Button } from "@/components/common/Button";
import Label from "@/components/common/Label";
import List from "@/components/common/List";
import { H2, Para } from "@/styles/StyledTypography";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function TwoColSection({
  grid,
  title,
  text,
  buttonText,
  buttonLink,
  imgSrc,
  flip,
  listArray,
  labelText,
  labelTextColor,
  labelBgColor,
}) {
  
  const ImageColumn = () => (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <ImageWrapper>
        <Image
          src={imgSrc}
          alt="section-image"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>
    </div>
  );

  const ContentColumn = () => (
    <ContentWrapper>
      {labelText && (
        <Label
          labelText={labelText}
          labelTextColor={labelTextColor}
          labelBgColor={labelBgColor}
        />
      )}
      <H2>{title}</H2>
      <Para>{text}</Para>
      <List grid={grid} listItems={listArray} />
      {buttonText && (
        <Link href={buttonLink}>
          <Button hoverAnimate>{buttonText}</Button>
        </Link>
      )}
    </ContentWrapper>
  );

  return (
    <Grid flip={flip}>
      {flip ? (
        <>
          <ContentColumn />
          <ImageColumn />
        </>
      ) : (
        <>
          <ImageColumn />
          <ContentColumn />
        </>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: fit-content;
  overflow: hidden;
  border-radius: 20px;
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: ${({ flip }) => (flip ? "column-reverse" : "column")};
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.5s transform cubic-bezier(0.23, 1, 0.32, 1);
  :hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 1000px) {
    height: 350px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  row-gap: 50px;
  @media screen and (max-width: 1000px) {
    padding: 40px;
    row-gap: 40px;
  }
`;
