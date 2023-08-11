"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputWrapper } from "./Styles";
import { updateProperty } from "@/slices/uploadSlice";
import { H4, Para } from "@/styles/StyledTypography";

function Description({ formik, dispatch, formRedux }) {
  const descriptionLength = formRedux?.property_description?.length
  const [length, setLength] = useState(descriptionLength == null ? 0 : descriptionLength);
  const textarea = useRef()

  useEffect(() => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = `${textarea.current.scrollHeight}px`;
  }, [formik.values.property_description]);
  
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
        <H4>Description</H4>
        <Para grey small>Give prospective tenants a sense of why they’ll love using this property for hosting short-term guests.</Para>
      </div>
      <InputWrapper>
        <textarea
          ref={textarea}
          name="property_description"
          onChange={(e) => {
            formik.setFieldTouched("property_description");
            formik.handleChange(e);
            dispatch(updateProperty({ property_description: e.target.value }));
            setLength(e.target.value.length);
          }}
          value={formik.values.property_description}
        />
        <Para grey small>
          {length} / 1000
        </Para>
        {formik.touched.property_description &&
        formik.errors.property_description ? (
          <Para red small>
            {formik.errors.property_description}
          </Para>
        ) : null}
      </InputWrapper>
    </>
  );
}

export default Description;
