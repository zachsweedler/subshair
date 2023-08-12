"use client";
import { H4, Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";
import SignInForm from "../auth-pages/SignInForm";
import ButtonMailTo from "../common/ButtonMailTo";

export default function ContactLandlord({
  email,
  firstName,
  lastName,
  onClose,
  session,
}) {

  const mailTo = `mailTo: ${email}`;

  return (
    <ContactOverlay onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        {!session ? (
         <>
            <CopyWrapper>
                <SignInForm overlay onClick={onClose}/>
            </CopyWrapper>
        </> 
        ) : (
          <>
            <CopyWrapper>
              <H4>Contact Landlord</H4>
              <Para grey>
                Listed by {firstName} {lastName}
              </Para>
            </CopyWrapper>
            <ButtonMailTo
                mailto={mailTo}
                label="Hi! I'm interested in renting this property."
            />
         </>
       )}
      </Wrapper>
    </ContactOverlay>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  overflow: hidden;
  max-width: 500px;
  padding: 50px;
`;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const ContactOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000000cc;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
