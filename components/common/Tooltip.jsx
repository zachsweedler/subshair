"use client";
import React from "react";
import styled from "styled-components";

function Tooltip({ tip }) {
  return <Wrapper>{tip}</Wrapper>;
}

export default Tooltip;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.borderRadius.base};
  border: 1px solid ${(props) => props.theme.colors.nuetral.borderGrey};
  color: ${(props) => props.theme.colors.white};
  gap: 0px;
  padding: 5px;
  height: auto;
  width: 100px;
`;
