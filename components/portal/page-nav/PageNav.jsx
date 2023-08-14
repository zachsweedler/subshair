"use client";
import { H5, Para } from "@/styles/StyledTypography";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import PortalSideMenuMobile from "../PortalSideMenuMobile";

export default function PageNav({
  title,
  children,
  breadcrumb,
  breadcrumbLink,
  top,
}) {
  const [visible, setVisible] = useState();

  const handleToggleClick = () => {
    setVisible(!visible);
  };

  return (
    <Wrapper breadcrumb={breadcrumb} top={top}>
      <TitleWrapper>
        {top && (
          <SideMenuToggle onClick={handleToggleClick}>
            <img src="/menu-icon-black.svg" alt="" height={15} width={15} />
          </SideMenuToggle>
        )}
        {visible && <PortalSideMenuMobile onClick={handleToggleClick} />}
        {breadcrumb ? (
          <Link href={breadcrumbLink}>
            <Para link grey>
              {breadcrumb}
            </Para>
          </Link>
        ) : (
          <H5>{title}</H5>
        )}
      </TitleWrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme?.colors?.white};
  border-bottom: ${({ theme, top }) => (top ? theme?.border?.base : null)};
  border-top: ${({ theme, top }) => (top ? null : theme?.border?.base)};
  position: fixed;
  top: ${({ top }) => (top ? 0 : null)};
  bottom: ${({ top }) => (top ? null : 0)};
  right: 0;
  width: calc(100% - 272px);
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 50;
  @media screen and (max-width: 900px) {
    width: 100%;
    z-index: 20;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 18px;
  align-items: center;
`;

const SideMenuToggle = styled.div`
  height: 40px;
  width: 40px;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: ${({ theme }) => theme.border.base};
  align-items: center;
  justify-content: center;
  display: none;
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  }
  :focus {
    border: ${({ theme }) => theme.border.active};
  }
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;
