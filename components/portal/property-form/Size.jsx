"use client";
import React from "react";
import { InputWrapper } from "./Styles";
import { updateProperty } from "@/slices/uploadSlice";
import { H4, Para } from "@/styles/StyledTypography";

function Size({ formik, dispatch }) {
  return (
    <>
      <H4>Size</H4>
      <InputWrapper>
        <label htmlFor="property_square_footage">Square Footage</label>
        <input
          name="property_square_footage"
          placeholder="1000"
          type="text"
          onChange={(e) => {
            formik.setFieldTouched("property_square_footage");
            formik.handleChange(e);
            dispatch(
              updateProperty({ property_square_footage: e.target.value })
            );
          }}
          value={formik.values.property_square_footage}
        />
        {formik.touched.property_square_footage &&
        formik.errors.property_square_footage ? (
          <Para red small>
            {formik.errors.property_square_footage}
          </Para>
        ) : null}
      </InputWrapper>
      <InputWrapper>
      <>
        <label htmlFor="property_lot_size">Lot Size</label>
        <input
          name="property_lot_size"
          placeholder="2000"
          type="text"
          onChange={(e) => {
            formik.setFieldTouched("property_lot_size");
            formik.handleChange(e);
            dispatch(updateProperty({ property_lot_size: e.target.value }));
          }}
          value={formik.values.property_lot_size}
        />
        {formik.touched.property_lot_size &&
        formik.errors.property_lot_size ? (
          <Para red small>
            {formik.errors.property_lot_size}
          </Para>
        ) : null}
        </>
      </InputWrapper>
    </>
  );
}

export default Size;
