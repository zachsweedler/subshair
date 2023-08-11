"use client";
import { Flex } from "@/components/common/Flexboxes";
import { H4, H5, Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";

function InfoGrid({
  bedrooms,
  bathrooms,
  type,
  squareFtg,
  lotSize,
  yearBuilt,
  market,
  furnishing,
}) {

  const info = [
    bedrooms && {
      title: "Bedrooms",
      data: <>{bedrooms}</>,
    },
    bathrooms && {
      title: "Bathrooms",
      data: <>{bathrooms}</>,
    },
    type && {
      title: "Type",
      data: <>{type.charAt(0).toUpperCase() + type.slice(1)}</>,
    },
    furnishing && {
      title: "Furnishing",
      data: <>{furnishing ? 'Yes' : 'No'}</>,
    },
    squareFtg && {
      title: "Space",
      data: (
        <Flex direction="row" columnGap="5px">
          {squareFtg}
          <Para small grey>
            sqft
          </Para>
        </Flex>
      ),
    },
    lotSize && {
      title: "Lot Size",
      data: (
        <Flex direction="row" columnGap="5px">
          {lotSize}
          <Para small grey>
            sqft
          </Para>
        </Flex>
      ),
    },
    yearBuilt && {
      title: "Year Built",
      data: <>{yearBuilt}</>,
    },
    market && {
      title: "Market",
      data: <>{market}</>,
    }
  ].filter(Boolean);

  return (
    <Wrapper>
      <H4>Property</H4>
      <Grid>
        {info.map((item) =>
          item.data ? (
            <InfoCell key={item.title}>
              <Para grey small>{item.title}</Para>
              <H5>{item.data}</H5>
            </InfoCell>
          ) : null
        )}
      </Grid>
    </Wrapper>
  );
}

export default InfoGrid;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  column-gap: 20px;
  width: 100%;
`;

const Grid = styled.div`
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 30px;
  align-items: start;
  width: 100%;
  @media screen and (max-width: 1000px){
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoCell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
  align-items: start;
`;
