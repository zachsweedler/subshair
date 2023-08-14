'use client'
import styled from "styled-components";


export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: auto;
  width: 100%;
  height: auto;
  padding: ${({theme}) => theme.container.padding.nav};
  max-width: ${({theme}) => theme.container.width.nav};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px 5px 0px 0px;
`;

export const FilterMenuItem = styled.div`
  width: auto;
  height: 40px;
  padding: 0px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: ${({ theme }) => theme.border.base};
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  }
  :focus {
    border: ${({ theme }) => theme.border.active};
  }
`;

// Range Slider Filters (Price, Revenue Share)
export const Wrapper = styled.div`
  display: flex;
  padding: 40px;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 30px;
  background-color: ${({ theme }) => theme?.colors?.white};
  position: relative;
  left: 0;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: start;
  row-gap: 14px;
`;

export const ValueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 12px;
  align-items: start;
  justify-content: center;
  padding: 9px 12px;
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  border: ${({ theme }) => theme?.border?.base};
`;

export const RangeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  align-items: center;
`;

// Multi-Select Filter (Amenities)

// Counter Filter (Beds, Baths)

