import Notification from "@/components/common/Notification";
import { updateFilter } from "@/slices/filterSlice";
import { Para } from "@/styles/StyledTypography";
import { SearchBox } from "@mapbox/search-js-react";
import { LottiePlayer } from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";
import loadingAnimation from "../../../public/loading.json"

function HeroSearch() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [hideCurrentLocation, setHideCurrentLocation] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const router = useRouter();
  const ref = useRef();

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
            flex-shrink: 0;
            height: auto;
            font-size: ${theme?.fontSizes?.h5} !important;
        }
        .SearchBox {
          display: flex;
          width: 100%;
        }
        .Input:focus {
          border: none !important;
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
        dispatch(
          updateFilter({
            filterName: "searchLatitude",
            value: latitude,
          })
        );
        dispatch(
          updateFilter({
            filterName: "searchLongitude",
            value: longitude,
          })
        );
        dispatch(
          updateFilter({
            filterName: "city",
            value: city,
          })
        );
        dispatch(
          updateFilter({
            filterName: "state",
            value: state,
          })
        );
        dispatch(
          updateFilter({
            filterName: "searchFeatureType",
            value: searchFeatureType,
          })
        );
        dispatch(
          updateFilter({
            filterName: "searchZoom",
            value: 13,
          })
        );
        setInputValue(inputValue);
        dispatch(
          updateFilter({
            filterName: "searchBbox",
            value: bbox,
          })
        );
        setInputValue(
          feature?.properties?.name +
            `, ${feature?.properties?.context?.region?.name}`
        );
        router.push("/explore")
      },
    [dispatch, router]
  );

  const handleCurrentLocation = () => {
      setError(null)
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Success callback
          dispatch(
            updateFilter({
              filterName: "searchLatitude",
              value: pos.coords.latitude,
            })
          );
          dispatch(
            updateFilter({
              filterName: "searchLongitude",
              value: pos.coords.longitude,
            })
          );
          dispatch(updateFilter({ filterName: "searchZoom", value: 15 }));
          setLoading(false)
          router.push("/explore")
        },
        (error) => {
          // Error callback
          setError("Unable to fetch your current location")
          console.error("Error fetching geolocation:", error); 
        }
      );
  }

  const handleInput = (event) => {
    console.log(event);
    setInputValue(event);
    if (event === "") {
      setHideCurrentLocation(false);
    } else {
      setHideCurrentLocation(true);
    }
  };

  return (
    <>
    <Wrapper>
      <InputWrapper>
        <input
          style={{
            position: "absolute",
            left: "0",
            zIndex: "100",
            opacity: "0%",
          }}
          onFocus={() => {
            ref.current?.focus();
            setIsFocused(true);
            setHideCurrentLocation(false);
          }}
        />
        <SearchBox
          ref={ref}
          placeholder="Enter a city or address..."
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
          theme={autoFillTheme}
          onRetrieve={handleRetrieve}
          onSuggest={() => setHideCurrentLocation(true)}
          value={inputValue}
          onChange={handleInput}
          options={{
            language: "en",
            types: "city,address,neighborhood",
            country: "US",
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
      {!hideCurrentLocation && isFocused ? (
        <CurrentLocation onClick={handleCurrentLocation}>
          <>
            <Para medium>Current Location</Para>
            {loading ? 
              <LoadingWrapper>
                <LottiePlayer animationData={loadingAnimation} loop={true} />
              </LoadingWrapper>
            :
              <Image
              alt=""
              src="/assets/images/icons/map-marker-black.svg"
              width={20}
              height={20}
            />
            }
          </>
        </CurrentLocation>
      ) : null}
    </Wrapper>
    {error && <Notification error text={error} />}
    </>
  );
}

export default HeroSearch;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;
  align-items: center;
  @media screen and (max-width: 1000px) {
    align-items: start;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  max-width: 500px;
  align-items: center;
`;

const Adornment = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const CurrentLocation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 15px 15px;
  background-color: white;
  box-shadow: ${({ theme }) => theme?.boxShadow?.light};
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
  border: ${({ theme }) => theme?.border?.base};
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme?.colors?.nuetral?.lightBgGrey};
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 40px;
  padding: 9px 12px 5px 12px;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50px;
  border-radius: 5px;
`;