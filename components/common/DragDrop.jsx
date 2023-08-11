import { Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

function DragDrop() {

  return (
    <>
      <Drag>
        <Button>Upload Photos</Button>
        <Para small grey>
          or drag them in
        </Para>
      </Drag>
    </>
  );
}

export default DragDrop;

const Drag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 50px;
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='lightgrey' stroke-width='1.5' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  :hover {
    background-color: ${({ theme }) => theme?.colors?.nuetral?.bgGrey};
  }
`;
