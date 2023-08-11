'use client'
import React from 'react'
import { Wrapper } from './Styles'
import { H5 } from '@/styles/StyledTypography'
import RoomSelector from './filter-components/RoomSelector'

export default function RoomsFilter() {
  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
  
            <H5>Bedrooms</H5>
            <RoomSelector type="bed"/>
            <H5>Bathrooms</H5>
            <RoomSelector/>
    </Wrapper>
  )
}
