"use client";
import { Button } from "@/components/common/Button";
import { H2, H3 } from "@/styles/StyledTypography";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

function Cat() {
  return (
    <Wrapper>
      <H2>Making Rental<br/>Arbitrage Work.</H2>
      <Link href="/sign-up">
        <Button hoverAnimate>Join SubShair</Button>
      </Link>
      <ImageWrapper>
        <Image
          src="/assets/images/marketing/cat-cabin-image.png"
          alt=""
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>
    </Wrapper>
  );
}

export default Cat;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
  height: 500px;
  padding: 100px;
  align-items: start;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  border-radius: 20px;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    padding: 40px;
    justify-content: start;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 100%;
  @media screen and (max-width: 1000px) {
    height: 260px;
    width: 200px;
  }
`;
