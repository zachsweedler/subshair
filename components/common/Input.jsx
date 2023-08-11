import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Flex } from "./Flexboxes";
import { useTheme } from "styled-components";
import { Para } from "@/styles/StyledTypography";

const Input = forwardRef(
  (
    {
      label,
      name,
      defaultValue,
      value,
      onChange,
      type,
      placeholder,
      min,
      max,
      required,
      multiple,
      autoComplete,
      IconSrcRight,
      onRightIconClick,
      IconSrcLeft,
      onLeftIconClick,
      readOnly,
      errorMessage,
      disabled,
      onBlur,
      id
    },
    ref
  ) => {
    const [padding, setPadding] = useState(null);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [align, setAlign] = useState(null);
    const [gap, setGap] = useState(null);
    const [rowGap, setRowGap] = useState(null);
    const [columnGap, setColumnGap] = useState(null);
    const [position, setPosition] = useState(null);
    const [transform, setTransform] = useState(null);
    const [top, setTop] = useState(null);
    const [left, setLeft] = useState(null);
    const [shadow, setShadow] = useState(null);
    const [border, setBorder] = useState(null);
    const [direction, setDirection] = useState(null);
    const [radius, setRadius] = useState(null);
    const theme = useTheme();

    useEffect(() => {
      // styling for Input types
      const checkType = () => {
        if (type === "checkbox") {
          setPadding("none");
          setPosition("relative");
          setHeight("30px");
          setWidth("30px");
          setAlign("center");
          setGap("12px");
          setRowGap("0px");
          setColumnGap('12px')
          setShadow("none");
          setBorder("1px solid" + theme.colors.nuetral.borderGrey);
          setRadius("3px");
          setTransform(null);
          setTop(null);
          setLeft(null);
          setDirection("row-reverse");
        } else if (type === "search") {
          setPadding("0px 9px");
          setPosition("relative");
          setHeight("40px");
          setWidth("100%");
          setAlign("center");
          setRowGap("9px");
          setColumnGap("0px");
          setGap("0px");
          setRadius("5px");
          setShadow(theme.boxShadow.input);
          setBorder("1px solid" + theme.colors.nuetral.borderGrey);
          setDirection("column");
        } else {
          setPadding("0px 9px");
          setHeight("40px");
          setPosition("relative");
          setWidth("100%");
          setAlign("start");
          setRowGap("9px");
          setRadius("5px");
          setColumnGap("0px");
          setGap("0px");
          setShadow("none");
          setTransform(null);
          setTop(null);
          setLeft(null);
          setBorder("1px solid" + theme.colors.nuetral.borderGrey);
          setDirection("column");
        }
      };

      checkType();
    }, [type, label, theme.boxShadow.input, theme.colors.nuetral.borderGrey]);

    return (
      <Flex
        direction={direction}
        columnGap={columnGap}
        rowGap={rowGap}
        align={align}
      >
        <label htmlFor={id} style={{ width: "100%" }}>
          <Para small grey>
            {label}
          </Para>
        </label>
        <Flex
          backgroundColor={theme?.colors?.text?.white}
          padding={padding}
          align={align}
          height={height}
          width={width}
          position={position}
          gap={gap}
          radius={radius}
          top={top}
          left={left}
          transform={transform}
          shadow={shadow}
          justify="space-between"
          overflow="hidden"
          border={border}
        >
          {IconSrcLeft ? (
            <Image
              onClick={onLeftIconClick}
              src={IconSrcLeft}
              alt=""
              width="18"
              height="18"
              style={{ cursor: "pointer" }}
            />
          ) : (
            ""
          )}
          {/* Input Element */}
          <input
            style={{
              width: width,
              height: height,
            }}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled ? true : false}
            required={required ? true : false}
            multiple={multiple ? true : false}
            ref={ref}
            id={id}
            overflow="hidden"
            autoComplete={autoComplete}
            value={value}
            defaultValue={defaultValue}
            onBlur={onBlur}
            readOnly={readOnly ? true : false}
          />
          {IconSrcRight ? (
            <Image
              onClick={onRightIconClick}
              src={IconSrcRight}
              alt=""
              width="15"
              height="15"
              style={{ cursor: "pointer" }}
            />
          ) : (
            ""
          )}
        </Flex>
        {errorMessage ? (
          <Para red small>
            {errorMessage?.message}
          </Para>
        ) : null}
      </Flex>
    );
  }
);

Input.displayName = "Input";

export default Input;
