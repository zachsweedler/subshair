"use client";
import { updateProperty } from "@/slices/uploadSlice";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import { InputWrapper } from "./Styles";

function Furnishing({ dispatch, formik }) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
        <H4>Furnishing</H4>
        <Para grey small>
          Is your property furnished?
        </Para>
      </div>
      <InputWrapper>
        <select
          name="property_furnishing"
          onChange={async (e) => {
            const furnishing = e?.target?.value === "true" ? true : false;
            await formik.setFieldValue("property_furnishing", furnishing);
            await formik.setFieldTouched("property_furnishing");
            dispatch(updateProperty({ property_furnishing: furnishing }));
          }}
          value={formik.values.property_furnishing}
        >
          <option value={null} disabled selected>
            Select Furnishing
          </option>
          <option value="true">Furnished</option>
          <option value="false">Not Furnished</option>
        </select>
        {formik.touched.property_furnishing &&
        formik.errors.property_furnishing ? (
          <Para red small>
            {formik.errors.property_furnishing}
          </Para>
        ) : null}
      </InputWrapper>
    </>
  );
}

export default Furnishing;
