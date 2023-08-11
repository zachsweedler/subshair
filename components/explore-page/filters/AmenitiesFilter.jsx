import React from 'react'
import { Wrapper } from './Styles'
import { useDispatch, useSelector } from 'react-redux'
import { amenities } from '@/utils/amenities';
import { AmenitiesGrid, Amenity } from '../../portal/property-form/Styles';
import { H5 } from '@/styles/StyledTypography';
import { updateFilter } from '@/slices/filterSlice';

function AmenitiesFilter() {

  const dispatch = useDispatch()
  const filterRedux = useSelector((state)=> state.filter.amenities)

  const handleAmenityClick = (amenity) => {
    let newAmenities;
    const currentAmenities = filterRedux;

    if (currentAmenities?.includes(amenity)) {
      newAmenities = currentAmenities?.filter(a => a !== amenity);
    } else {
      newAmenities = [...currentAmenities, amenity];
    }

    dispatch(updateFilter({filterName: 'amenities', value: newAmenities}));
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <H5>Amenities</H5>
      <AmenitiesGrid>
        {amenities.map((amenity)=>(
          <Amenity key={amenity} onClick={() => handleAmenityClick(amenity)} selected={filterRedux?.includes(amenity)}>
            {amenity}
          </Amenity>
        ))}
      </AmenitiesGrid>
    </Wrapper>
  )
}
export default AmenitiesFilter

