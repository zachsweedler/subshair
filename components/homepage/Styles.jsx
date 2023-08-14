'use client'
import styled from 'styled-components'

export const Section = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 5;
  padding: 70px 30px;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    padding: 45px 30px;
  }
`;

export const Container = styled.div`
  max-width: ${({theme})=> theme.container.width.lg};
  margin: 0 auto;
`;