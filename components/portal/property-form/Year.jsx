"use client";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import { InputWrapper } from "./Styles";
import { updateProperty } from "@/slices/uploadSlice";

function Year({formik, dispatch}) {
  return (
    <>
      <H4>Year Built</H4>
      <InputWrapper>
        <label htmlFor="property_year_built">Year</label>
        <input
          onFocus={(e) => {
            e.target.setAttribute("autocomplete", "off");
          }}
          onChange={(e) => {
            formik.setFieldTouched("property_year_built");
            formik.handleChange(e);
            e.target.setAttribute("autocomplete", "off");
            dispatch(updateProperty({ property_year_built: e.target.value }));
          }}
          name="property_year_built"
          placeholder="2013"
          value={formik.values?.property_year_built}
          type="text"
        />
        {formik.touched.property_year_built && formik.errors.property_year_built ? (
          <Para red small>
            {formik.errors.property_year_built}
          </Para>
        ) : null}
      </InputWrapper>
    </>
  );
}

export default Year;
