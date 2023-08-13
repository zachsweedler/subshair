'use client'
import { Para } from '@/styles/StyledTypography'
import React from 'react'
import styled from 'styled-components'

function MapMarker({number, onClick}) {

  const handleClick = (event) => {
    event.stopPropagation();
    onClick && onClick();
  }

  return (
    <Wrapper onClick={handleClick}>
        <Para white style={{pointerEvents: "none", fontWeight: "500"}}>${number.toLocaleString()}</Para>
    </Wrapper>
  )
}

export default MapMarker

const Wrapper = styled.div`
    background-color: ${({theme})=> theme.colors.black};
    padding: 3px 9px;
    border-radius:  ${({theme})=> theme.borderRadius.base};
    box-shadow: ${({theme})=> theme.boxShadow.marker};
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    :hover {
      cursor: pointer;
      transform: scale(1.05);
    }
`