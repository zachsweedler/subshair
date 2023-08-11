"use client";
import { updateProperty } from "@/slices/uploadSlice";
import { H5 } from "@/styles/StyledTypography";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

function RoomCounter({ formik, type, name }) {
  const [localValue, setLocalValue] = useState(formik.values[name]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalValue(formik.values[name]);
  }, [formik.values, name]);

  const handleClick = (increment) => {
    const updatedValue = localValue + (type === "bed" ? increment : increment / 2);
    setLocalValue(updatedValue);
    formik.setFieldValue(name, updatedValue);
    const propertyType = type === "bed" ? "property_bedrooms" : "property_bathrooms";
    dispatch(updateProperty({ [propertyType]: updatedValue }));
  };

  return (
    <Wrapper>
    <input
      style={{ display: "none" }}
      name={name}
      placeholder="123 Main Street"
      value={formik?.values[name]}
      type="text"
    />
    <Button
      onClick={() => handleClick(1)}
      disabled={type === "bed" ? formik?.values[name] === 20 : formik?.values[name] === 15}
    >
      <Image
        src="/assets/images/icons/plus-icon-black.svg"
        alt=""
        width={20}
        height={20}
        style={{
          userSelect: "none"
        }}
      />
    </Button>
    <H5 style={{userSelect: "none"}}>{formik.values[name]}</H5>
    <Button onClick={() => handleClick(-1)} disabled={formik.values[name] === 1}>
      <Image
        src="/assets/images/icons/minus-icon-black.svg"
        alt=""
        width={20}
        height={20}
        style={{
          userSelect: "none"
        }}
      />
    </Button>
  </Wrapper>
  );
}

export default RoomCounter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  width: 170px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme?.border?.base};
  border-radius: 100%;
  width: 30px;
  height: 30px;
  padding: 25px;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  background-color: ${({ theme }) => theme?.colors?.nuetral?.bgGrey};
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    background-color: ${({ theme }) => theme?.colors?.lightGrey};
    transform: scale(0.95);
    cursor: pointer;
  }
`;
