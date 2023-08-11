'use client'
import styled from "styled-components";

export const Flex = styled.div`
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align};
  width: ${props => props.width || "auto"};
  max-width: ${props => props.maxWidth || "auto"};
  height: ${props => props.height || "auto"};
  max-height: ${props => props.maxHeight || "auto"};
  position: ${props => props.position || "relative"};
  gap: ${props => props.gap || "0px"};
  row-gap: ${props => props.rowGap || "0px"};
  column-gap: ${props => props.columnGap || "0px"};
  cursor: ${props => props.cursor || "auto"};
  overflow: ${props => props.overflow || "none"};
  margin: ${props => props.margin || "0px"};
  padding: ${props => props.padding || "0px"};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  z-index: ${props => props.z};
  border: ${props => props.border};
  border-bottom: ${props => props.borderBottom};
  border-top: ${props => props.borderTop};
  border-radius:  ${props => props.radius};
  box-shadow: ${props => props.shadow};
  transform: ${props => props.transform};
  background: ${props => props.bg};
`;

export const FlexItem = styled.div`
  flex: ${props => props.flex || "1 1 auto"};
  order: ${props => props.order || "0"};
  align-self: ${props => props.align || "auto"};
  width: ${props => props.width || "auto"};
  height: ${props => props.height || "auto"};
  position: ${props => props.position || "relative"};
`;

