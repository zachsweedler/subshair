"use client";
import { Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";

function DropDown({ items, handleClick }) {

  return (
    <Menu>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          isLastItem={index === items.length - 1}
          onClick={(e) => {
            e.stopPropagation;
            handleClick(item);
          }}
        >
          <Para white style={{ cursor: "pointer" }}>
            {item.label}
          </Para>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default DropDown;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.black};
  gap: 0px;
  width: auto;
  position: absolute;
  z-index: 99999;
  right: 0;
  bottom: -6px;
  transform: translateY(100%);
  border-radius: ${(props) => props.theme.borderRadius.base};
  overflow: hidden;
  white-space: nowrap;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 6px 12px;
  border-bottom: ${(props) =>
    props.isLastItem ? "none" : `1px solid ${props.theme.colors.darkGrey}`};
  :hover {
    background-color: ${(props) => props.theme.colors.darkGrey};
    cursor: pointer;
  }
`;
