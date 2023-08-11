'use client'
import { Para } from '@/styles/StyledTypography'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

export default function List({ listItems, grid }) {
    return (
      <ListWrapper grid={grid}>
        {listItems?.map((item, index) => (
          <CheckboxWrapper key={index}>
            <Image alt="check-box-image" src="/assets/images/icons/check-icon-black.svg" width={18} height={18} style={{transform: `translateY(5px)`}}/>
            <Para>{item.text}</Para>
          </CheckboxWrapper>
        ))}
      </ListWrapper>
    );
  }

const CheckboxWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 12px;
`

const ListWrapper = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    grid-gap: 12px;
    grid-template-columns: ${(props)=> props.grid && `1fr 1fr`};
    grid-template-rows: ${(props)=> props.grid && `1fr 1fr 1fr`};
`