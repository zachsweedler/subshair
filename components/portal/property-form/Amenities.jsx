"use client";
import React from "react";
import { AmenitiesGrid, Amenity, InputWrapper } from "./Styles";
import { H4, Para } from "@/styles/StyledTypography";
import { updateProperty } from "@/slices/uploadSlice";
import { amenities } from "@/utils/amenities";

function Amenities({dispatch, formik, formRedux}) {

  const handleAmenityClick = (amenity) => {
    let newAmenities;
    dispatch((dispatch, getState) => {
        const currentAmenities = getState().propertyUpload.property_amenities;
        if (currentAmenities?.includes(amenity)) {
            newAmenities = currentAmenities?.filter(a => a !== amenity);
        } else {
            newAmenities = [...currentAmenities, amenity];
        }
        dispatch(updateProperty({ property_amenities: newAmenities }));
    });
    formik.setFieldValue('property_amenities', newAmenities)
};
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
        <H4>Amenities</H4>
        {formRedux?.property_amenities?.length > 0 && <Para grey small>{formRedux?.property_amenities?.length} selected</Para>}
      </div>
      <InputWrapper>
        <AmenitiesGrid>
          {amenities.map((amenity) => (
            <Amenity key={amenity} onClick={() => handleAmenityClick(amenity)} selected={formRedux?.property_amenities?.includes(amenity)}>
              {amenity}
            </Amenity>
          ))}
        </AmenitiesGrid>
        </InputWrapper>
        {formik.touched.property_amenities &&
          formik.errors.property_amenities ? (
            <Para red small>
              {formik.errors.property_amenities}
            </Para>
          ): null}
    </>
  );
}

export default Amenities;
