"use client";
import { H4, Para } from "@/styles/StyledTypography";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import SignInForm from "../auth-pages/SignInForm";

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
                <SignInForm/>
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
            <Link href={mailTo}>
              <Button hoverAnimate style={{ width: "100%" }}>
                Email {firstName}
              </Button>
            </Link>
         </>
       )}
      </Wrapper>
    </ContactOverlay>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  row-gap: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  overflow: hidden;
  max-width: 500px;
  margin: 0px 30px;
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
