"use client";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";

function Description({ description }) {
  return (
    <Wrapper>
      <H4>Owner&apos;s Overview</H4>
      <Para>{description}</Para>
    </Wrapper>
  );
}

export default Description;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  column-gap: 20px;
  width: 100%;
`;
