import RoomCounter from "@/components/common/RoomCounter";
import React from "react";
import { CounterWrapper } from "./Styles";
import { H4, Para } from "@/styles/StyledTypography";

function Rooms({ formik }) {
  return (
    <>
      <H4>Rooms</H4>
      <CounterWrapper>
        <Para grey style={{marginBottom: "9px"}}>Bedrooms</Para>
        <RoomCounter formik={formik} type="bed" name="property_bedrooms" />
      </CounterWrapper>
      <CounterWrapper>
        <Para grey style={{marginBottom: "9px"}}>Bathrooms</Para>
        <RoomCounter formik={formik} name="property_bathrooms" />
      </CounterWrapper>
    </>
  );
}

export default Rooms;
