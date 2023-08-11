"use client";
import { H1, H4 } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";
import HeroSearch from "./inputs/HeroSearch";

function Hero() {
  return (
        <Content>
          <H1 hero>
            Find Properties
            <br />
            for Rental Arbitrage
          </H1>
          <H4 thin>
            Finding properties to rent & <br /> Airbnb for profit has never been
            easier.
          </H4>
          <HeroSearch />
        </Content>
  );
}

export default Hero;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding: 30px 30px;
  height: 70vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 150px 30px 100px 30px;
  @media screen and (max-width: 1000px) {
    justify-content: center;
    align-items: start;
    text-align: left;
    padding: 150px 30px 100px 30px;
  }
`;

