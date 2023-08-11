"use client";
import { Button } from "@/components/common/Button";
import { H1, H5, Para } from "@/styles/StyledTypography";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

function Steps() {
  return (
    <Wrapper>
      <H1>How It Works</H1>
      <StepGrid>
        <GridItem>
          <Image
            src="/assets/images/icons/subshair-icon-black.svg"
            alt=""
            width="45"
            height="45"
          />
          <Para>
            <span>
              <H5>Find.</H5>
            </span>
            Explore SubShair listings. Each displays monthly rent and the
            landlord&apos;s revenue share.
          </Para>
        </GridItem>
        <GridItem>
          <Image
            src="/assets/images/icons/forecast-icon-black.svg"
            alt=""
            width="45"
            height="45"
          />
          <Para>
            <span>
              <H5>Forecast.</H5>
            </span>
            Forecast future cashflows using our estimate tools. It factors in
            expenses from revenue share, rent, utility bills, maintenance fees,
            real-time occupancy rates, platform fees, to applicable taxes.
          </Para>
        </GridItem>
        <GridItem>
          <Image
            src="/assets/images/icons/pay-icon-black.svg"
            alt=""
            width="45"
            height="45"
          />
          <Para>
            <span>
              <H5>Operate Remotely.</H5>
            </span>
            After your lease activates with your landlord, automate your Airbnb
            with SubShair&apos;s services marketplace. Secure your ideal team
            including a cleaning crew, a handyman, and a contractor.
          </Para>
        </GridItem>
      </StepGrid>
    </Wrapper>
  );
}

export default Steps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  text-align: start;
  gap: 80px;
  align-self: stretch;
  width: 100%;
  background-color: white;
  height: auto;
  @media screen and (max-width: 1000px) {
    padding: 15px;
  }
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 90px;
  width: 100%;
  height: fit-content;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  @media screen and (max-width: 1000px) {
    padding: 0px 100px 0px 0px;
    align-items: start;
  }
`;
