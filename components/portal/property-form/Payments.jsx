import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import { InputWrapper } from "./Styles";
import { updateProperty } from "@/slices/uploadSlice";

function Payments({ dispatch, formik }) {
  return (
    <>
      <H4>Monthly Payment</H4>
      <InputWrapper>
        <label htmlFor="property_rent">Rent</label>
        <input
          onFocus={(e) => {
            e.target.setAttribute("autocomplete", "off");
          }}
          onChange={(e) => {
            formik.setFieldTouched("property_rent");
            formik.handleChange(e);
            e.target.setAttribute("autocomplete", "off");
            dispatch(updateProperty({ property_rent: e.target.value }));
          }}
          name="property_rent"
          placeholder="1200"
          value={formik.values?.property_rent}
          type="text"
        />
        {formik.touched.property_rent && formik.errors.property_rent ? (
          <Para red small>
            {formik.errors.property_rent}
          </Para>
        ) : null}
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="property_rev_share">Revenue Share</label>
        <input
          name="property_rev_share"
          placeholder="Revenue Share"
          type="text"
          onChange={(e) => {
            formik.setFieldTouched("property_rev_share");
            formik.handleChange(e);
            dispatch(updateProperty({ property_rev_share: e.target.value }));
          }}
          value={formik.values.property_rev_share}
        />
        {formik.touched.property_rev_share &&
        formik.errors.property_rev_share ? (
          <Para red small>
            {formik.errors.property_rev_share}
          </Para>
        ) : null}
      </InputWrapper>
    </>
  );
}

export default Payments;
