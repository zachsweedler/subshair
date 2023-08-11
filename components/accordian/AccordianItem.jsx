'use client'
import { H4 } from '@/styles/StyledTypography'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

function AccordianItem({question, onClick}) {
  return (
    <Wrapper onClick={onClick}>
        <H4 style={{pointerEvents: "none"}}>{question}</H4>
        <Image src="/assets/images/icons/plus-icon-black.svg" alt="open-faq-icon" width={18} height={18} />
    </Wrapper>
  )
}

export default AccordianItem


const Wrapper = styled.div`
    background-color: ${({theme})=> theme?.colors?.nuetral?.bgGrey};
    padding: 25px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    border-radius: ${({theme})=> theme?.borderRadius?.base};
    :hover {
        cursor: pointer;
    }
`