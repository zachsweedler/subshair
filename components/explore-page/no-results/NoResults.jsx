"use client";
import { Para } from "@/styles/StyledTypography";
import styled from "styled-components";

export default function NoResults() {


  return (
      <TextWrapper>
          <Para medium>No results matched your search</Para>
      </TextWrapper>
  );
}

const TextWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  row-gap: 12px;
  padding: 12px 20px;
  background-color: white;
  top: 55px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  border-radius: 100px;
`;
