"use client";
import { Para } from "@/styles/StyledTypography";
import { SearchBox } from "@mapbox/search-js-react";
import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { updateFilter } from "@/slices/filterSlice";
import { FilterMenuItem, FilterWrapper } from "../Styles";
import FilterPopup from "../filter-popup/FilterPopup";

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
      minWidth: "100px",
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
      console.log('res', res)
      const feature = res.features[0];
      const bbox = feature.properties?.bbox
      dispatch(
        updateFilter({
          filterName: "searchLatitude",
          value: feature.geometry.coordinates[1],
        })
      );
      dispatch(
        updateFilter({
          filterName: "searchLongitude",
          value: feature.geometry.coordinates[0],
        })
      );
      dispatch(
        updateFilter({
          filterName: "city",
          value: feature?.properties?.name,
        })
      );
      dispatch(
        updateFilter({
          filterName: "state",
          value: feature?.properties?.context?.region?.region_code,
        })
      );
      dispatch(
        updateFilter({
          filterName: "searchZoom",
          value: 13,
        })
      );
      dispatch(
        updateFilter({
          filterName: "searchBbox",
          value: bbox,
        })
      );
      dispatch(
        updateFilter({
          filterName: "searchFeatureType",
          value: feature?.properties?.feature_type,
        })
      );
      setInputValue(
        feature?.properties?.name +
          `, ${feature?.properties?.context?.region?.name}`
      );
    },
    [dispatch]
  );

  const handleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  return (
    <>
      <FilterWrapper>
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
        <FilterMenuItem onClick={handleFilterPopup}>
          <Para style={{ cursor: "pointer" }}>Filters</Para>
          {showFilterPopup ? <FilterPopup /> : null}
        </FilterMenuItem>
      </FilterWrapper>
    </>
  );
}
