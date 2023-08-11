import React from "react";
import styled from "styled-components";

// Modal
export function PopupModal({ children, onClick }) {
  return <PopupOverlay onClick={onClick}>{children}</PopupOverlay>;
}

// Card
export function PopupCard({ children, onClick }) {
  return <PopupCardWrap onClick={onClick}>{children}</PopupCardWrap>;
}

// Styles for Modal
const PopupOverlay = styled.div`
  position: fixed;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9990;
  background-color: rgba(0, 0, 0, 0.54);
`;

// Styles for Card
const PopupCardWrap = styled.div`
  padding: 60px;
  max-width: 400px;
  width: 100%;
  position: fixed;
  z-index: 9999;
  left: 50%;
  display: flex;
  gap: 30px;
  flex-direction: column;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 18px 4px 189px rgba(0, 0, 0, 0.379);
  backdrop-filter: blur(9px);
  border-radius: 9px;
`;
