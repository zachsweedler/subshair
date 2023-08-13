"use client";
import ImageSlider from "@/components/property-detail-page/ImageSlider";
import React, { useState } from "react";
import styled from "styled-components";
import ImagesGrid from "./page-sections/ImagesGrid";
import InfoKey from "./page-sections/InfoKey";
import InfoGrid from "./page-sections/InfoGrid";
import AmenitiesGrid from "./page-sections/AmenitiesGrid";
import Location from "./page-sections/Location";
import Description from "./page-sections/Description";
// import Estimates from "./page-sections/Estimates";
import { Divider } from "../common/Divider";
import Footer from "../homepage/Footer";

export default function DetailPage({ propData, landlordData, session }) {
  const property = propData;

  // const [monthlyGross, setMonthlyGross] = useState(2420);
  // const [monthlyNet, setMonthlyNet] = useState(1200);
  // const [yearlyNet, setYearlyNet] = useState(9);

  // for Profit Caclulator Overlay
  // const [calcOpen, setCalcOpen] = useState(false);
  // const showCalc = () => {
  //   setCalcOpen(!calcOpen);
  // };

  // for Image Slider Overlay
  const [sliderOpen, setSliderOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const showSlider = (index) => {
    setSelectedImageIndex(index);
    setSliderOpen(!sliderOpen);
  };

  return (
    <Wrapper>
      <ImageSlider
        images={property?.property_images}
        open={sliderOpen}
        onClick={showSlider}
      />
      {/* <ProfitCalculator open={calcOpen} onClick={showCalc} /> */}
      <ContentGrid>
          <ImagesGrid
            onClick={(index) => showSlider(index)}
            images={property.property_images}
        />
        <InfoKey
          rent={property.property_rent.toLocaleString()}
          revShare={property.property_rev_share}
          address={property.property_address}
          unitNumber={property.property_unit_number}
          city={property.property_city}
          state={property.property_state}
          landlordData={landlordData}
          session={session}
        />
        {/* <Divider/>
          <Estimatess
            monthlyRev={`$${monthlyGross}`}
            monthlyCashflow={`$${monthlyNet}`}
            monthlyMargin={`${yearlyNet}%`}
          /> */}
        <Divider />
        <InfoGrid
          bedrooms={property.property_bedrooms}
          bathrooms={property.property_bathrooms}
          type={property.property_type}
          furnished={property.property_furnished}
          squareFtg={property.property_square_footage.toLocaleString()}
          lotSize={property.property_lot_size.toLocaleString()}
          yearBuilt={property.property_year_built}
          market={property.property_city}
          furnishing={property.property_furnishing}
        />
        <Divider />
        <Location
          longitude={property?.property_longitude}
          latitude={property?.property_latitude}
        />
        <Divider />
        <AmenitiesGrid amenities={property.property_amenities} />
        <Divider />
        <Description description={property.property_description} />
        <Footer detailPage />
      </ContentGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.container.width.md};
  padding: ${({ theme }) => theme.container.padding.pdpcontent};
  width: 100%;
  align-items: center;
  margin: auto;
`;

const ContentGrid = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 50px;
  height: fit-content;
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    width: 100%;
    padding: 0px;
  }
`;
