import React, { forwardRef } from 'react';
import { Flex } from './Flexboxes';
import { Para } from '@/styles/StyledTypography';
import styled, { useTheme } from 'styled-components';

const TextArea = forwardRef(
  ({ label, name, value, onChange, onBlur, placeholder, required, errorMessage, defaultValue, id }, ref) => {
    const theme = useTheme();
    return (
      <>
        <Flex direction="column" rowGap="12px">
          <label htmlFor={id}><Para grey small>{label}</Para></label>
          <TextAreaWrapper> 
            <textarea
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              required={required ? true : false}
              ref={ref}
              style={{backgroundColor: "transparent", height: "100%", padding: "6px"}}
            >
              {defaultValue}
            </textarea>
          </TextAreaWrapper>
          <Para style={{ color: theme.colors.alerts.error.background }} small>
            {errorMessage?.message}
          </Para>
        </Flex>
      </>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;

const TextAreaWrapper = styled.div`
  align-items: center; 
  height: auto;
  border-radius: 5px;
  border: ${(props) => props.theme.border.base};
  overflow: hidden;
  padding: 9px;
`