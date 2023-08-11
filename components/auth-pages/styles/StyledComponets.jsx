'use client'
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 1fr;
  }
`;

export const GridItem = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0px 30px 0px 30px;
  @media screen and (max-width: 1000px) {
    padding: 0px 30px 0px 30px;
    justify-content: start;
  }
`;
