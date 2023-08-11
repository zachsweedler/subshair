"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map, Marker, NavigationControl, Popup } from "react-map-gl";
import styled from "styled-components";
import { supabaseClient } from "@/utils/supabase";
import ExploreMarker from "@/components/explore-page/marker/MapMarker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loading.json";
import PropertyCard from "../property-cards/PropertyCard";
import "./Popup.css";
import FilterNav from "./filters/filter-nav/FilterNav";
import NoResults from "./no-results/NoResults";
import { WebMercatorViewport } from "viewport-mercator-project";
import { updateFilter } from "@/slices/filterSlice";

function PropertyMap() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState({});
  const sizeRef = useRef(null);

  // filter redux states
  const searchLatitude = useSelector((state) => state.filter.searchLatitude);
  const searchLongitude = useSelector((state) => state.filter.searchLongitude);
  const searchZoom = useSelector((state) => state.filter.searchZoom)
  const rentMax = useSelector((state) => state.filter.rentMax);
  const rentMin = useSelector((state) => state.filter.rentMin);
  const revShareMax = useSelector((state) => state.filter.revShareMax);
  const revShareMin = useSelector((state) => state.filter.revShareMin);
  const furnishing = useSelector((state) => state.filter.furnishing);
  const beds = useSelector((state) => state.filter.bedrooms);
  const baths = useSelector((state) => state.filter.bathrooms);
  const amenities = useSelector((state) => state.filter.amenities);
  const dispatch = useDispatch();
  const [mapWidth, setMapWidth] = useState();
  const [mapHeight, setMapHeight] = useState();

  const getBoundingBox = useCallback((width, height) => {
    const viewport = new WebMercatorViewport({
      width,
      height,
      longitude: searchLongitude,
      latitude: searchLatitude,
      zoom: searchZoom
    });
    const nw = viewport.unproject([0, 0]);
    const se = viewport.unproject([viewport.width, viewport.height]);
    return { nw, se };
  },[searchLongitude, searchLatitude, searchZoom]);

  // If screen size changes, update the sizeRef value with latest screen dimensions.
  const updateSize = useCallback(() => {
    setTimeout(() => {
      if (sizeRef.current) {
        setMapWidth(sizeRef.current.offsetWidth);
        setMapHeight(sizeRef.current.offsetHeight);
      }
    }, 500);  // 200 milliseconds delay
  }, [sizeRef]);

  // trigger updateSize function on window events.
  useEffect(() => {
    updateSize()
    window.addEventListener("resize", updateSize);
    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  // useEffect to handle map's view state based on Search Box selection.
  useEffect(() => {
    setView((prevView) => ({
      ...prevView,
      longitude: searchLongitude || -98.5795,
      latitude: searchLatitude || 39.8283,
      zoom: searchZoom || 4.125
    }));
  }, [searchLongitude, searchLatitude]);

  // onMove function to allow user to zoom/pan around.
  const onMapMove = (evt) => {
    setView(evt.viewState);
  };

  // onMoveEnd function which updates the redux store longitude/latitude with latest coordinates/zoom level.
  const onMapMoveEnd = ({ viewState }) => {
    const { latitude, longitude, zoom } = viewState;
    dispatch(updateFilter({ filterName: "searchLatitude", value: latitude }));
    dispatch(updateFilter({ filterName: "searchLongitude", value: longitude }));
    dispatch(updateFilter({ filterName: "searchZoom", value: zoom }))
  };

  // useEffect for fetching properties, re-runs everytime a filter is modified.
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        if (mapWidth && mapHeight) {
          const { nw, se } = getBoundingBox(mapWidth, mapHeight);
          let { data: propsInView } = await supabaseClient.rpc(
            "properties_in_view",
            {
              min_lat: nw[1],
              min_long: nw[0],
              max_lat: se[1],
              max_long: se[0],
            }
          );
          // Filter properties based on conditions
          const filteredProps = propsInView.filter((prop) => {
            return (
              prop.property_status === "Listed" &&
              prop.property_rent >= rentMin &&
              prop.property_rent <= rentMax &&
              prop.property_rev_share >= revShareMin &&
              prop.property_rev_share <= revShareMax &&
              (beds === "*" || prop.property_bedrooms === beds) &&
              (baths === "*" || prop.property_bathrooms === baths) &&
              (furnishing === null ||
                prop.property_furnishing === furnishing) &&
              (amenities.length === 0 ||
                amenities.every((amenity) =>
                  prop.property_amenities.includes(amenity)
                ))
            );
          });
          setProperties(filteredProps);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [
    searchLongitude,
    searchLatitude,
    searchZoom,
    beds,
    baths,
    furnishing,
    rentMin,
    amenities,
    rentMax,
    revShareMin,
    revShareMax,
    mapHeight,
    mapWidth,
    getBoundingBox
  ]);

  // function to navigate to the property detail page.
  const handlePopupClick = (selected) => {
    const url = `/explore/property/${selected.id}`;
    window.open(url, "_blank").focus();
  };

  return (
    <>
    <Wrapper ref={sizeRef}>
      <FilterNav />
      <Map
        {...view}
        onMove={onMapMove}
        onMoveEnd={onMapMoveEnd}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/subshair/cl811pk9h004w14pfyw49lodp"
      >
        {loading && (
          <LoadingWrapper>
            <Lottie animationData={loadingAnimation} loop={true} />
          </LoadingWrapper>
        )}
        {properties && properties.length > 0 ? (
          properties.map((item, index) => (
            <div key={index}>
              <Marker
                longitude={item.property_longitude}
                latitude={item.property_latitude}
                anchor="center"
              >
                <ExploreMarker
                  number={item.property_rent}
                  onClick={() => setSelected(item)}
                />
              </Marker>
            </div>
          ))
        ) : (
          <NoResults />
        )}
        {selected && !loading && (
          <Popup
            longitude={selected.property_longitude}
            latitude={selected.property_latitude}
            offset={15}
            maxWidth="270px"
            style={{ padding: "0px !important" }}
            onClose={() => {
              setSelected(null);
            }}
          >
            <PropertyCard
              explore
              rent={selected.property_rent}
              revShare={selected.property_rev_share}
              images={selected.property_images}
              address={selected.property_address}
              status={selected.property_status}
              city={selected.property_city}
              state={selected.property_state}
              onClick={() => handlePopupClick(selected)}
            />
          </Popup>
        )}
        <NavigationControl position="top-left" />
      </Map>
    </Wrapper>
    </>
  );
}

export default PropertyMap;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px;
  width: 100%;
  height: calc(100vh - 70px);
  overflow: hidden;
  margin-top: 70px;
  border-top: ${({ theme }) => theme.border.base};
`;

const LoadingWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 40px;
  padding: 9px 12px 5px 12px;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50px;
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  border-radius: 5px;
`;
