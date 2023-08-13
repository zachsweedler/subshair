"use client";
import React from "react";
import styled from "styled-components";
import ImageSliderCard from "../image-slider/ImageSliderCard";
import { H4, H5, Para } from "@/styles/StyledTypography";
import { Flex } from "@/components/common/Flexboxes";
import Image from "next/image";
import DropDown from "@/components/common/DropDown";
import { Button } from "@/components/common/Button";
import { Divider } from "@/components/common/Divider";
import StatusLabel from "./property-status-label/StatusLabel";
import MuiTooltip from "../common/MuiTooltip";

function PropertyCard({
  images,
  status,
  city,
  state,
  rent,
  address,
  unitNumber,
  revShare,
  beds,
  baths,
  menuItems,
  handleMenuItems,
  cardIndex,
  index,
  onMenuClick,
  onEditClick,
  type,
  explore,
  onClick,
  style
}) {
  return (
    <CardWrapper explore={explore} onClick={type === "manage" ? null : onClick} style={style}>
      <ImageSliderCard explore={explore} images={images} onArrowsClick={(e) => e.stopPropagation()} />
      <Content explore={explore}>
        {type === "manage" ? <StatusLabel status={status} /> : null}
        <AddressRow>
          <H5>{address}{unitNumber && (', ' + unitNumber)}</H5>
          <Para grey small>
            {city}, {state}
          </Para>
        </AddressRow>
        <Divider />
        <Flex rowGap="5px" direction="column">
          <RentRow>
              <TooltipWrapper>
                <Para grey small>
                  Rent
                </Para>
                {type === "manage" ?
                <MuiTooltip text="Your desired monthly rent to collect from your tenant."/>
                :
                <MuiTooltip text="Landlord's desired monthly rent."/>
              }
              </TooltipWrapper>
            <Flex direction="row" columnGap="3px">
              {rent ? <Para medium>${rent.toLocaleString()}</Para> : <Para grey medium>N/A</Para>}
            </Flex>
          </RentRow>
          <RevShareRow>
              <TooltipWrapper>
              <Para grey small>
                Revenue Share
              </Para>
              {type === "manage" ?
                <MuiTooltip text="Your percentage share of the monthly revenue generated from your tenant listing your property on short-term rental platforms like Airbnb or VRBO."/>
                :
                <MuiTooltip text="Landlord's ideal percentage share of the monthly reservation revenue generated from hosting this property on platforms like Airbnb or VRBO."/>
              }
              </TooltipWrapper>
              <Flex direction="row" columnGap="3px">
                {revShare ? <Para medium>{revShare}%</Para>  : <Para medium grey>N/A</Para>}
              </Flex>
          </RevShareRow>
          <BedRow>
              <TooltipWrapper>
              <Para grey small>
                Bedrooms
              </Para>
              </TooltipWrapper>
              <Flex direction="row" columnGap="3px">
                {beds ? <Para medium>{beds}</Para>  : <Para medium grey>N/A</Para>}
              </Flex>
          </BedRow>
          <BathRow>
              <TooltipWrapper>
              <Para grey small>
                Bathrooms
              </Para>
              </TooltipWrapper>
              <Flex direction="row" columnGap="3px">
                {baths ? <Para medium>{baths}</Para>  : <Para medium grey>N/A</Para>}
              </Flex>
          </BathRow>
        </Flex>
        {type === "manage" ? (
          <>
            <Divider />
            <ButtonsRow>
              <Button
                onClick={onEditClick}
                grey
                style={{
                  width: "100%",
                  display: "flex",
                  columnGap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  width="12"
                  height="12"
                  alt=""
                  src="/assets/images/icons/edit-icon-grey.svg"
                />
                {status === "Draft" ? "Finish Draft" : "Edit"}
              </Button>
              <Button onClick={onMenuClick} grey>
                <Image
                  width="12"
                  height="12"
                  alt=""
                  src="/assets/images/icons/dots-icon-grey.svg"
                />
                {cardIndex === index && (
                  <DropDown items={menuItems} handleClick={handleMenuItems} />
                )}
              </Button>
            </ButtonsRow>
          </>
        ) : null}
      </Content>
    </CardWrapper>
  );
}

export default PropertyCard;

const CardWrapper = styled.div`
  border-radius: ${(props) => props.theme.borderRadius.base};
  display: flex;
  flex-direction: column;
  max-width: 100%;
  height: auto;
  position: relative;
  border: ${(props) => (props.explore ? "none" : props.theme.border.base)};
  box-shadow: ${(props) =>
    props.explore ? props.theme.boxShadow.light : "none"};
  background-color: ${({ theme }) => theme?.colors?.white};
  :hover {
    cursor: ${({explore })=> explore ? 'pointer' : 'default'};
  }
`;

const Content = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top: ${({explore })=> explore ? '200px' : '250px'};
  padding: 20px;
  :hover {
    cursor: ${({explore })=> explore ? 'pointer' : 'default'};
  }
`;

const AddressRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  :hover {
    cursor: ${({explore })=> explore ? 'pointer' : 'default'};
  }
`;

const RentRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: 5px;
  row-gap: 5px;
  justify-content: space-between;
  :hover {
    cursor: ${({explore })=> explore ? 'pointer' : 'default'};
  }
`;

const RevShareRow = styled(RentRow)`
  
`
const BedRow = styled(RentRow)`
  
`
const BathRow = styled(RentRow)`
  
`

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: 5px;
  column-gap: 12px;
`;

const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`