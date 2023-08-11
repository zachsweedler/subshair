"use client";
import { updateProperty } from "@/slices/uploadSlice";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";

function Type({formik, dispatch}) {
  return (
    <>
      <H4>Property Type</H4>
      <select
        name="property_type"
        onChange={(e) => {
          formik.setFieldTouched("property_type");
          formik.handleChange(e);
          dispatch(updateProperty({ property_type: e.target.value }));
        }}
        value={formik.values.property_type}
      >
        <option disabled selected>
          Select a Property Type
        </option>
        <option value="Apartment">Apartment</option>
        <option value="Green">Condo</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Single Family">Single Family</option>
        <option value="Multi Family">Multi Family</option>
      </select>
      {formik.touched.property_type &&
        formik.errors.property_type ? (
          <Para red small>
            {formik.errors.property_type}
          </Para>
        ) : null}
    </>
  );
}

export default Type;
