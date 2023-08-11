"use client";
import { Para } from "@/styles/StyledTypography";
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

function AccordianPanel({ answer }) {
  return (
    <Wrapper>
      <Answer>
        <Para black>
          {answer}
        </Para>
      </Answer>
    </Wrapper>
  );
}

export default AccordianPanel;

const slideInAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  background-color: none;
  padding: 25px;
  justify-content: start;
  overflow: hidden;
`;

const Answer = styled.div`
  width: 100%;
  height: auto;
  animation: ${slideInAnimation} 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`;
