'use client'
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
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

export const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-radius: ${({theme})=> theme.borderRadius.base};
  font-size: ${({theme})=> theme.fontSizes.psm};
  background-color: ${({theme})=> theme.colors.alerts.error.light.background};
  color: ${({theme})=> theme.colors.alerts.error.light.text};
`

export const InfoBox = styled(ErrorBox)`
    background-color: ${({theme})=> theme.colors.alerts.info.light.background};
    color: ${({theme})=> theme.colors.alerts.info.light.text};
`