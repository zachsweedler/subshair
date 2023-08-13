'use client'
import React from 'react'
import { Wrapper } from './Styles'
import { updateFilter } from '@/slices/filterSlice';
import { useDispatch, useSelector } from "react-redux";
import { H4, H5, Para } from '@/styles/StyledTypography';
import { InputWrapper } from '@/components/portal/property-form/Styles';

export default function PropertyTypeFilter() {

  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter.propertyType)
  
  const handleChange = (event) => {
    dispatch(updateFilter({filterName: 'propertyType', value: event?.target?.value}));
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
    <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
      <H5>Property Type</H5>
    </div>
    <InputWrapper>
      <select
          name="property_type"
          onChange={handleChange}
          value={filterState}
      >
        <option value="" disabled>
            <Para>Select Property Type</Para>
        </option>
        <option value="Apartment">Apartment</option>
        <option value="Condo">Condo</option>
        <option value="Single Family">Single Family</option>
        <option value="Multi Family">Multi Family</option>
        <option value="Townhouse">Townhouse</option>
      </select>
    </InputWrapper>
  </Wrapper>
  )
}

