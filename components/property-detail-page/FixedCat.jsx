"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { H5, Para } from "@/styles/StyledTypography";
import ContactLandlord from "./ContactLandlord";

function FixedCat({ propData, landlordData, session }) {
  const [visible, setVisible] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleContactClick = () => {
    setShowContactPopup(!showContactPopup);
  };

  return (
    <>
      {visible && propData && (
        <FixedWrapper>
          <Container>
            <LocationWrapper>
              <H5>
                {propData.property_address}
                {propData.property_unit_number && `, ${propData.property_unit_number}`}
              </H5>
              <Para grey small>
                {propData.property_city}
                {`, ${propData.property_state}`}
              </Para>
            </LocationWrapper>
            <Button onClick={handleContactClick}>Contact Landlord</Button>
            {showContactPopup && ( 
                <ContactLandlord
                  email={landlordData.email}
                  firstName={landlordData.first_name}
                  lastName={landlordData.last_name}
                  session={session}
                  onClose={handleContactClick} 
                />
            )}
          </Container>
        </FixedWrapper>
      )}
    </>
  );
}

export default FixedCat;

const FixedWrapper = styled.div`
  position: fixed;
  background-color: white;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  box-shadow: 0px -2px 1.5px 0px rgba(0, 0, 0, 0.03);
  border-bottom: ${({ theme }) => theme.border.base};
`;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.width.md};
  padding: ${({ theme }) => theme.container.padding.nav};
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px;
`;
