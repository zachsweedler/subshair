'use client'
import styled from 'styled-components';

const Container = styled.div`
  max-width: ${props => props.theme.container.width[props.maxWidth]};
  margin: 0 auto;
  padding: ${props => props.theme.container.padding[props.padding]};
  position:  ${props => props.position || "relative"};
  width:  ${props => props.theme.container.width[props.width]};
  top: ${props => props.top};
  left: ${props => props.left};
  height: ${props => props.height};
  display: ${props => props.display};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  bottom:  ${props => props.bottom};
  z-index: ${props => props.z};
  border-radius: ${props => props.radius};
`;

export default Container;