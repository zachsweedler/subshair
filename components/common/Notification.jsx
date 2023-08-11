'use client'
import { Para } from '@/styles/StyledTypography'
import React, { useRef, useEffect } from 'react'
import styled, { useTheme, keyframes } from 'styled-components'

function Notification({ text, success, error }) {
  const wrapperRef = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (success) {
      wrapper.style.backgroundColor = theme?.colors?.alerts?.success?.dark?.background;
      wrapper.style.color = theme?.colors?.alerts?.success?.dark?.text;
    } else if (error) {
      wrapper.style.backgroundColor = theme?.colors?.alerts?.error?.dark?.background;
      wrapper.style.color = theme?.colors?.alerts?.error?.dark?.text;
    } else {
      wrapper.style.backgroundColor = theme?.colors?.brand?.secondary;
    }
  }, [success, error, theme])

  return (
    <Wrapper ref={wrapperRef}>
      <Para white>{text}</Para>
    </Wrapper>
  )
}

export default Notification

const slideInSlideOut = keyframes`
  0% {
    transform: translateY(100px);
  }
  20% {
    transform: translateY(0px);
  }
  80% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(100px);
  }
`;

const Wrapper = styled.div`
  padding: 12px;
  border-radius: 5px;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 30px;
  animation: ${slideInSlideOut} 5s ease-in-out;
  animation-fill-mode: both;
  z-index: 50000;
  box-shadow: ${(props) => props.theme.boxShadow.input};
`;

