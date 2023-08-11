import styled from 'styled-components'

const transition = "height 0.15s 0s ease, width 0.15s 0s ease";

export const Range = styled.input`
  cursor: pointer;
  background: linear-gradient(
    to right,
    ${(props) => (props.seeking ? props.highlighted : props.colorBefore)} 0%,
    ${(props) => (props.seeking ? props.highlighted : props.colorBefore)} ${(props) => props.percent}%,
    ${(props) => props.colorAfter} ${(props) => props.percent}%,
    ${(props) => props.colorAfter} 100%
);
  border-radius: 8px;
  height: 5px;
  width: 100%;
  outline: none;
  padding: 0;
  margin: 10px 0px;
  -webkit-transition: ${transition};
  -moz-transition: ${transition};
  -o-transition: ${transition};
  transition: ${transition};
  -webkit-appearance: none;
  appearance: none;
  &::-webkit-slider-thumb {
    border: none;
    -webkit-appearance: none;
    width: ${(props) => (props.seeking ? props.growTo : props.size)}px;
    height: ${(props) => (props.seeking ? props.growTo : props.size)}px;
    cursor: pointer;
    background: ${(props) =>
      props.seeking ? props.colorBefore : props.highlight};
    border-radius: 50%;
  }
  &::-ms-thumb {
    border: none;
    height: ${(props) => (props.seeking ? props.growTo : props.size)}px;
    width: ${(props) => (props.seeking ? props.growTo : props.size)}px;
    border-radius: 50%;
    background: ${(props) =>
      props.seeking ? props.highlighted : props.colorBefore};
    cursor: pointer;
  }
  &::-moz-range-thumb {
    border: none;
    height: ${(props) => (props.seeking ? props.growTo : props.size)}px;
    width: ${(props) => (props.seeking ? props.growTo : props.size)}px;
    border-radius: 50%;
    background: ${(props) =>
      props.seeking ? props.highlighted : props.colorBefore};
    cursor: pointer;
  }
`;