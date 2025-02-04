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
import { useRouter } from "next/navigation";

function PropertyMap() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState({});
  const [mapWidth, setMapWidth] = useState();
  const [mapHeight, setMapHeight] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const sizeRef = useRef(null);
  const mapRef = useRef(null);
  const isMounted = useRef(true);

  // map camera related redux states
  const searchLatitude = useSelector((state) => state.filter.searchLatitude);
  const searchLongitude = useSelector((state) => state.filter.searchLongitude);
  const searchZoom = useSelector((state) => state.filter.searchZoom);
  const searchBbox = useSelector((state) => state.filter.searchBbox);
  const searchFeatureType = useSelector(
    (state) => state.filter.searchFeatureType
  );

  // filter related redux states
  const rentMax = useSelector((state) => state.filter.rentMax);
  const rentMin = useSelector((state) => state.filter.rentMin);
  const revShareMax = useSelector((state) => state.filter.revShareMax);
  const revShareMin = useSelector((state) => state.filter.revShareMin);
  const furnishing = useSelector((state) => state.filter.furnishing);
  const propertyType = useSelector((state) => state.filter.propertyType);
  const beds = useSelector((state) => state.filter.bedrooms);
  const baths = useSelector((state) => state.filter.bathrooms);
  const amenities = useSelector((state) => state.filter.amenities);


  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, [properties, searchLatitude, dispatch, searchLongitude, searchZoom]);


  // fit bounds of region on searchbox select.
  useEffect(() => {
    const currentMapRef = mapRef.current;
    if (currentMapRef && isMounted.current) {
      const map = currentMapRef.getMap();
      // Check if map is already loaded
      if (map.loaded()) {
        if (searchFeatureType === "address" || searchFeatureType === "street") {
          map.flyTo({ center: [searchLongitude, searchLatitude], zoom: 16 });
        } else {
          map.fitBounds(searchBbox);
        }
      } else {
        // This ensures the map is fully loaded before trying to manipulate it.
        map.on("load", () => {
          if (
            searchFeatureType === "address" ||
            searchFeatureType === "street"
          ) {
            map.flyTo({ center: [searchLongitude, searchLatitude], zoom: 16 });
          } else {
            map.fitBounds(searchBbox);
          }
        });
      }
    }
    // Cleanup
    return () => {
      if (currentMapRef) {
        const map = currentMapRef.getMap();
        map.off("load");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFeatureType, searchBbox]);

  
  // fed into the "properties_in_view" rpc function.
  const getBoundingBox = useCallback(
    (width, height) => {
      const viewport = new WebMercatorViewport({
        width,
        height,
        longitude: searchLongitude,
        latitude: searchLatitude,
        zoom: searchZoom,
      });
      const nw = viewport.unproject([0, 0]);
      const se = viewport.unproject([viewport.width, viewport.height]);
      return { nw, se };
    },
    [searchLongitude, searchLatitude, searchZoom]
  );

  // If screen size changes, update the sizeRef value with latest screen dimensions.
  const updateSize = useCallback(() => {
    setTimeout(() => {
      if (sizeRef.current) {
        setMapWidth(sizeRef.current.offsetWidth);
        setMapHeight(sizeRef.current.offsetHeight);
      }
    }, 500); // 200 milliseconds delay
  }, [sizeRef]);

  // trigger updateSize function on window events.
  useEffect(() => {
    updateSize();
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
      zoom: searchZoom || 4.125,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    dispatch(updateFilter({ filterName: "searchZoom", value: zoom }));
  };

  // useEffect for fetching properties, re-runs everytime a filter is modified.
  useEffect(() => {
    const isStatusListed = (prop) => prop.property_status === "Listed";
    const isRentWithinRange = (prop) => {
      if (rentMax === 10000) {
        return prop.property_rent >= rentMin;
      }
      return prop.property_rent >= rentMin && prop.property_rent <= rentMax;
    };
    const isRevShareWithinRange = (prop) => {
      return (
        prop.property_rev_share >= revShareMin &&
        prop.property_rev_share <= revShareMax
      );
    };
    const isBedroomCountValid = (prop) => {
      return beds === "*" || prop.property_bedrooms >= beds;
    };
    const isBathroomCountValid = (prop) => {
      return baths === "*" || prop.property_bathrooms >= baths;
    };
    const isFurnishingValid = (prop) => {
      return furnishing === "" || prop.property_furnishing === furnishing;
    };
    const isPropertyTypeValid = (prop) => {
      return propertyType === "" || prop.property_type === propertyType;
    };

    const areAmenitiesValid = (prop) => {
      return (
        amenities.length === 0 ||
        amenities.every((amenity) => prop.property_amenities.includes(amenity))
      );
    };

    const filterProperties = (propsInView) => {
      return propsInView.filter((prop) => {
        return (
          isStatusListed(prop) &&
          isRentWithinRange(prop) &&
          isRevShareWithinRange(prop) &&
          isBedroomCountValid(prop) &&
          isBathroomCountValid(prop) &&
          isFurnishingValid(prop) &&
          isPropertyTypeValid(prop) &&
          areAmenitiesValid(prop)
        );
      });
    };

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
          const filteredProps = filterProperties(propsInView);
          if (filteredProps) {
            setProperties(filteredProps);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [
    mapHeight,
    mapWidth,
    getBoundingBox,
    rentMax,
    rentMin,
    revShareMin,
    revShareMax,
    beds,
    baths,
    furnishing,
    propertyType,
    amenities,
  ]);

  // function to navigate to the property detail page.
  const handlePopupClick = (selected) => {
    const url = `/explore/property/${selected.id}`;
    router.push(url);
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
          boxZoom={true}
          ref={mapRef}
          initialViewState={{
            longitude: searchLongitude || -98.5795,
            latitude: searchLatitude || 39.8283,
            zoom: searchZoom || 4.125
          }}
        >
          {loading && (
            <LoadingWrapper>
              <Lottie animationData={loadingAnimation} loop={true} />
            </LoadingWrapper>
          )}
          {properties.length > 0 ? (
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
            !loading && <NoResults />
          )}
          {selected && !loading && (
            <Popup
              longitude={selected.property_longitude}
              latitude={selected.property_latitude}
              offset={25}
              maxWidth="270px"
              onClose={() => {
                setSelected(null);
              }}
              style={{ padding: "0px", width: 'auto', alignItems: "center" }}
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
                beds={selected.property_bedrooms}
                baths={selected.property_bathrooms}
                onClick={() => handlePopupClick(selected)}
              />
            </Popup>
          )}
          <NavigationControl position="bottom-right" />
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
  height: calc(100% - 80px);
  overflow: hidden;
  position: fixed;
  border-top: ${({ theme }) => theme.border.base};
  @media screen and (max-width: 1000px) {
    margin-top: 0px;
    height: calc(100% - 80px);
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
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50px;
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  border-radius: 5px;
`;
