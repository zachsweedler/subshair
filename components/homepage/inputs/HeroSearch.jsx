import { updateFilter } from "@/slices/filterSlice";
import { SearchBox } from "@mapbox/search-js-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";

function HeroSearch() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const router = useRouter()

  const autoFillTheme = {
    variables: {
      fontFamily: "Poppins, sans-serif",
      color: theme?.colors?.black,
      colorBackgroundHover: theme?.colors?.nuetral?.bgGrey,
      lineHeight: "1.45",
      unit: theme?.fontSizes?.h5,
      fontWeight: theme?.fontWeights?.text?.p,
      padding: "0.5em",
      paddingModal: "1em",
      borderRadius: theme?.borderRadius?.base,
      border: theme?.border?.base,
      boxShadow: theme?.boxShadow.base,
      minWidth: "100px",
    },
    cssText: `
        .Input {
            padding: 15px 15px;
            display: flex;
            width: 100%;
            height: auto;
            font-size: ${theme?.fontSizes?.h5} !important;
            box-shadow:  ${theme?.boxShadow?.light}
        }
        .Input:focus {
          border: none !important;
          box-shadow:  ${theme?.boxShadow?.light}
        }
        .ResultsAttribution {
            display: none !important;
        }
        .SearchIcon {
            display: none;
        }
        .ActionIcon {
            display: none;
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
      router.push('/explore')
    },
    [dispatch, router]
  );

  return (
    <InputWrapper>
      <SearchBox
          placeholder="Enter a city, state, or address..."
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
      <Adornment>
        <Image
          alt=""
          src="/assets/images/icons/search-icon-black.svg"
          width={20}
          height={20}
        />
      </Adornment>
    </InputWrapper>
  );
}

export default HeroSearch;

const InputWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  max-width: 500px;
`;

const Adornment = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
