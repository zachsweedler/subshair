"use client";
import { Button } from "@/components/common/Button";
import MuiTooltip from "@/components/common/MuiTooltip";
import { H4, Para } from "@/styles/StyledTypography";
import React, { useState } from "react";
import styled from "styled-components";
import ContactLandlord from "../ContactLandlord";

function InfoKey({
  address,
  unitNumber,
  city,
  state,
  rent,
  revShare,
  landlordData,
  session
}) {
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleContactClick = () => {
    setShowContactPopup(!showContactPopup);
  };

  return (
    <>
      <Grid>
        <LocationWrapper>
          <H4>
            {address}
            {unitNumber && `, ${unitNumber}`}
          </H4>
          <Para grey small>
            {city}
            {state && `, ${state}`}
          </Para>
        </LocationWrapper>
        <NumbersWrapper>
          <NumbersRow>
            <MuiTooltip
              title="Monthly Rent"
              text="The monthly rent paid to the landlord."
              placement="top"
            />
            <H4>${rent}</H4>
          </NumbersRow>
          <NumbersRow>
            <MuiTooltip
              title="Monthly Revenue Share"
              text="The portion of the total monthly revenue generated from the rental arbitrage property (through listing on short-term rental platforms like Airbnb or VRBO) that is paid to the landlord as per the agreed-upon terms of the lease."
              placement="top"
            />
            <H4>{revShare}%</H4>
          </NumbersRow>
        </NumbersWrapper>
        <Button hoverAnimate onClick={handleContactClick}>Contact Landlord</Button>
        {showContactPopup && (
          <ContactLandlord
            email={landlordData.email}
            firstName={landlordData.first_name}
            lastName={landlordData.last_name}
            session={session}
            onClose={handleContactClick} 
          />
        )}
      </Grid>
    </>
  );
}

export default InfoKey;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  width: 100%;
  align-items: start;
  justify-items: start;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px;
`;

const NumbersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
`;

const NumbersRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: start;
  align-items: center;
  width: 100%;
`;

const ContactOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000000ec;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
