"use client";
import MuiTooltip from "@/components/common/MuiTooltip";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";

function Estimates({ monthlyRev, monthlyCashflow, monthlyMargin, onClick }) {

  const tooltips = [
    {
        text: 'Total income generated each month through bookings on short-term rental platforms like Airbnb or VRBO.'
    },
    {
        text: 'Refers to the surplus income you earn after deducting all monthly expenses (including rent, utilities, maintenance, revenue share, platform fees, and applicable taxes) from the monthly revenue received.',
    },
    {
        text: 'The profit margin expressed as a percentage, calculated by subtracting all monthly expenses, from the total monthly revenue, and then dividing the result by the total monthly revenue.'
    },
  ]  
  
  return (
    <Wrapper>
      <H4>Estimations</H4>
      <StatGrid>
        <StatWrapper>
          <MuiTooltip title="Revenue, Monthly" text={tooltips[0].text} placement="top"/>
          <H4>{monthlyRev}</H4>
        </StatWrapper>
        <StatWrapper>
            <MuiTooltip title="Cashflow, Monthly" text={tooltips[1].text} placement="top"/>
            <H4>{monthlyCashflow}</H4>
        </StatWrapper>
        <StatWrapper>
            <MuiTooltip title="Margin, Monthly" text={tooltips[2].text} placement="top"/>
            <H4>{monthlyMargin}</H4>
        </StatWrapper>
      </StatGrid>
    </Wrapper>
  );
}

export default Estimates;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
`;

const StatGrid = styled.div`
  background: ${({ theme }) => theme?.colors?.nuetral?.bgGrey};
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  width: 100%;
  padding: 40px 0px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-gap: 4ch;
  }
`;

const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: fit-content;
`;
