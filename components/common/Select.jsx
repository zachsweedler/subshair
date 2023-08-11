import React, { forwardRef } from 'react';
import { Flex } from './Flexboxes';
import styled from 'styled-components';
import { Para } from '@/styles/StyledTypography';

const Select = forwardRef(({ options, onBlur, label, name, id, autoComplete, errorMessage, ...props}, ref) => {
  return (
    <Flex direction="column" rowGap="12px">
      <label htmlFor={id}><Para grey small>{label}</Para></label>
      <SelectWrapper> 
        <select onBlur={onBlur} ref={ref} id={id} name={name} autoComplete={autoComplete} style={{backgroundColor: "transparent", height: "100%", padding: "0px 12px"}} {...props}>
          <option value="" hidden>Select {label}</option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </SelectWrapper>
      {errorMessage ? (
          <Para red small>
            {errorMessage?.message}
          </Para>
        ) : null}
    </Flex>
  );
});

Select.displayName = 'Select';

export default Select;

const SelectWrapper = styled.div`
  align-items: center; 
  height: 40px;
  border-radius: 5px;
  border: ${(props) => props.theme.border.base};
  overflow: hidden;
`