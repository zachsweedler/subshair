"use client";
import React from "react";
import styled from "styled-components";

export default function Submit({children}) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme?.colors?.white};
  border-bottom: ${({ theme }) => theme?.border?.base };
  border-top: ${({ theme }) => theme?.border?.base};
  position: fixed;
  width: calc(100% - 272px);
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 50 !important;
  bottom: 0;
  @media screen and (max-width: 900px) {
    width: 100%;
    z-index: 50;
  }
`;

