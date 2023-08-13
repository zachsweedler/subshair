'use client'
import React from 'react'
import { Wrapper } from './Styles'
import { updateFilter } from '@/slices/filterSlice';
import { useDispatch, useSelector } from "react-redux";
import { H4, H5 } from '@/styles/StyledTypography';
import { InputWrapper } from '@/components/portal/property-form/Styles';

export default function FurnishingFilter() {

  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter.furnishing)
  
  const handleChange = (event) => {
    dispatch(updateFilter({filterName: 'furnishing', value: event?.target?.value === "true" ? true : false}))
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
    <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
      <H5>Furnishing</H5>
    </div>
    <InputWrapper>
      <select
        name="property_furnishing"
        onChange={async (e) => {
          handleChange(e)
        }}
        value={filterState}
      >
        <option value="" disabled selected>
          Select Furnishing
        </option>
        <option value="true">Furnished</option>
        <option value="false">Not Furnished</option>
      </select>
    </InputWrapper>
  </Wrapper>
  )
}

