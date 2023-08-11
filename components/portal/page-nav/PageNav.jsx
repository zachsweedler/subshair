"use client";
import { H5, Para } from "@/styles/StyledTypography";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function PageNav({ title, children, breadcrumb, breadcrumbLink, top}) {
  return (
    <Wrapper breadcrumb={breadcrumb} top={top}>
      <TitleWrapper>
        {breadcrumb ? <Link href={breadcrumbLink}>
            <Para link grey>{breadcrumb}</Para>
          </Link> : <H5>{title}</H5>}
      </TitleWrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme?.colors?.white};
  border-bottom: ${({theme, top}) => (top ? theme?.border?.base : null)};
  border-top: ${({theme, top}) => (top ? null : theme?.border?.base)};
  position: fixed;
  top: ${({top}) => (top ? 0 : null)};
  bottom: ${({top}) => (top ? null : 0)};
  right: 0;
  z-index: 500;
  width: calc(100% - 272px);
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: start;
`;