"use client";
import { Para } from "@/styles/StyledTypography";
import { SearchBox } from "@mapbox/search-js-react";
import React, { useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { updateFilter } from "@/slices/filterSlice";
import { FilterMenuItem, FilterWrapper } from "../Styles";
import FilterPopup from "../filter-popup/FilterPopup";
import Image from "next/image";

export default function FilterNav() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const autoFillTheme = {
    variables: {
      fontFamily: "Poppins, sans-serif",
      color: theme?.colors?.black,
      colorBackgroundHover: theme?.colors?.nuetral?.bgGrey,
      lineHeight: "1.45",
      unit: theme?.fontSizes?.p,
      fontWeight: theme?.fontWeights?.text?.p,
      fontSemiBold: theme?.fontWeights?.text?.h5,
      fontWeightBold: theme?.fontWeights?.text?.h1,
      padding: "0.5em",
      paddingModal: "1em",
      borderRadius: theme?.borderRadius?.base,
      border: theme?.border?.base,
      boxShadow: "none",
      maxWidth: "100px"
    },
    icons: {
      search: `
        <svg width="14" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.0791" cy="6.94019" r="5.1991" stroke="#595959" stroke-width="1.76"/>
        <rect x="9.81543" y="10.4575" width="5.61623" height="1.76" transform="rotate(43.1205 9.81543 10.4575)" fill="#595959"/>
        </svg>
    `,
    },
    cssText: `
        .Input {
          padding: 0px 30px;
          height: 38.5px;
          width: 100%;
        }
        .Input:focus {
          border: none !important;
        }
        .ResultsAttribution {
            display: none !important;
        }
    `,
  };


  // handle search box menu item selection
  const handleRetrieve = useCallback(
    async (res) => {
      if (!res || !res.features || !res.features[0]) {
        console.error("Invalid response object:", res);
        return;
      }
      const feature = res.features[0];
      const bbox = feature?.properties?.bbox;
      const latitude = feature?.geometry?.coordinates[1];
      const longitude = feature?.geometry.coordinates[0];
      const city = feature?.properties?.name;
      const state = feature?.properties?.context?.region?.region_code;
      const searchFeatureType = feature?.properties?.feature_type;
      const inputValue =
        feature?.properties?.name +
        `, ${feature?.properties?.context?.region?.name}`;

      if (latitude !== undefined) {
        dispatch(
          updateFilter({
            filterName: "searchLatitude",
            value: feature.geometry.coordinates[1],
          })
        );
      }
      if (longitude !== undefined) {
        dispatch(
          updateFilter({
            filterName: "searchLongitude",
            value: feature.geometry.coordinates[0],
          })
        );
      }
      if (city !== undefined) {
        dispatch(
          updateFilter({
            filterName: "city",
            value: feature?.properties?.name,
          })
        );
      }
      if (state !== undefined) {
        dispatch(
          updateFilter({
            filterName: "state",
            value: feature?.properties?.context?.region?.region_code,
          })
        );
      }
      if (searchFeatureType !== undefined) {
        dispatch(
          updateFilter({
            filterName: "searchFeatureType",
            value: feature?.properties?.feature_type,
          })
        );
      }

      dispatch(
        updateFilter({
          filterName: "searchZoom",
          value: 13,
        })
      );

      if (inputValue !== undefined) {
        setInputValue(
          feature?.properties?.name +
            `, ${feature?.properties?.context?.region?.name}`
        );
      }

      if (bbox !== undefined) {
        dispatch(
          updateFilter({
            filterName: "searchBbox",
            value: bbox,
          })
        );
      }
      
    },
    [dispatch]
  );

  const handleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  return (
    <>
      <FilterWrapper>
        <InputWrapper>
          <SearchBox
            placeholder="City or address..."
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
            theme={autoFillTheme}
            onRetrieve={handleRetrieve}
            value={inputValue}
            options={{
              language: 'en',
              types: "city,address,neighborhood",
              country: 'US',
            }}
          />
        </InputWrapper>
        <FilterMenuItem onClick={handleFilterPopup}>
          <img src='/filter-icon-black.svg' alt='' height={15} width={15}/>
          {showFilterPopup ? <FilterPopup /> : null}
        </FilterMenuItem>
      </FilterWrapper>
    </>
  );
}


const InputWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  max-width: 300px;
  @media screen and (max-width: 1000px) {
    max-width: 100%;
  }
`