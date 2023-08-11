"use client";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";

function AmenitiesGrid({ amenities }) {
  return (
    <Wrapper>
      <H4>Amenities</H4>
      <Grid>
        {amenities?.map((amenity) => (
          <Amenity key={amenity}>
            <Para grey small>{amenity}</Para>
          </Amenity>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default AmenitiesGrid;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  column-gap: 20px;
  width: 100%;
`;

const Grid = styled.div`
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: start;
  width: 100%;
`;

const Amenity = styled.div`
  background-color: ${({ theme }) => theme?.colors?.nuetral?.bgGrey};
  width: auto;
  height: auto;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  display: flex;
  align-items: center;
  justify-content: center;
`;
