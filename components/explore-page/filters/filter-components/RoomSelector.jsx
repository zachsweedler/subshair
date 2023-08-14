import { updateFilter } from "@/slices/filterSlice";
import { Para } from "@/styles/StyledTypography";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function RoomSelector({ type }) {
  const dispatch = useDispatch();
  const bedCountRedux = useSelector((state) => state.filter.bedrooms);
  const bathCountRedux = useSelector((state) => state.filter.bathrooms);
  const options = ["*", 1, 2, 3, 4, 5, 6, 7, 8];

  const handleSelect = (option) => {
    dispatch(updateFilter({ filterName: type === "bed" ? "bedrooms" : "bathrooms", value: option }));
  };

  return (
    <Wrapper>
      {options.map((option) => (
        <Option key={option} onClick={() => handleSelect(option)} selected={type === "bed" ? (bedCountRedux === option ? true : null) : (bathCountRedux === option ? true : null)}>
          {type === "bed" ? 
            <Para white={bedCountRedux === option ? true : null}>
                 {option === "*" ? "Any" : option + "+"}
            </Para> 
            : 
            <Para white={bathCountRedux === option ? true : null}>
                {option === "*" ? "Any" : option + "+"}
            </Para>}
        </Option>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 9px;
  column-gap: 9px;
  width: 100%;
  height: auto;
`;

const Option = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  padding: 9px 15px;
  border: ${({ theme }) => theme.border.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, selected }) => (selected ? theme?.colors?.black : theme?.colors?.white)};
`;