const { default: styled } = require("styled-components");

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 70px;
  width: 100%;
  align-items: start;
  max-width: 700px;
  margin: auto;
  padding-bottom: 130px;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
  align-items: start;
`;

export const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  position: relative;
`;

export const CounterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const AmenitiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  row-gap: 15px;
  column-gap: 15px;
`;

export const Amenity = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: ${({ theme }) => theme.border.base};
  font-size: ${({ theme }) => theme.fontSizes.p};
  background-color: ${({ selected }) => selected ? 'black' : 'white'};
  color: ${({ selected }) => selected ? 'white' : 'black'};
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    font-size: ${({ theme }) => theme.fontSizes.psm};
  }
`

export const ImageDropZone = styled.div`
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
`

export const ImageWrapper = styled.div`
  display: flex;
  height: auto;
  position: relative;
  width: 220px;
  height: 130px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme?.borderRadius?.base};;
`

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  height: fit-content;
  grid-gap: 12px;
`