'use client'
import React from 'react'
import { CheckboxWrapper, Wrapper } from './Styles'
import { updateFilter } from '@/slices/filterSlice';
import { useDispatch, useSelector } from "react-redux";
import { H5, Para } from '@/styles/StyledTypography';

export default function FurnishingFilter() {

  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter.furnishing)
  
  const handleChange = (event) => {
    dispatch(updateFilter({filterName: 'furnishing', value: event.target.checked}))

  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
        <CheckboxWrapper>
            <H5>Furnished</H5>
            <input type="checkbox" onChange={handleChange} checked={filterState}/>
        </CheckboxWrapper>
    </Wrapper>
  )
}

