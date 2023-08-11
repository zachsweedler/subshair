'use client'
import React from 'react'
import styled from 'styled-components'
import { Flex } from './Flexboxes'
import { H2, Para } from '@/styles/StyledTypography'
import Link from 'next/link'

function SectionHeader({heading, description, buttonHref, withButton, buttonText}) {
  return (
    <Wrapper>
        <Flex direction='column'>
            <H2>{heading}</H2>
            <Para grey>{description}</Para>
        </Flex>
        {withButton && <Link href={buttonHref}><button>{buttonText}</button></Link>}
    </Wrapper>
  )
}

export default SectionHeader

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`