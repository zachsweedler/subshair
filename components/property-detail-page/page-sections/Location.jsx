"use client";
import { H4 } from "@/styles/StyledTypography";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import styled from "styled-components";
import 'mapbox-gl/dist/mapbox-gl.css'

function Location({ longitude, latitude }) {

  const [view, setView] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 15,
  });

  const size = 50

  useEffect(() => {
    setView((prevView) => ({
      ...prevView,
      longitude: longitude,
      latitude: latitude,
    }));
  }, [longitude, latitude]);

  return (
    <Wrapper>
      <H4>The Market</H4>
      <MapWrapper>
        <Map
          {...view}
          onMove={(evt) => setView(evt.viewState)}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/subshair/cl811pk9h004w14pfyw49lodp"
          scrollZoom={false}
        >
          <Marker longitude={longitude} latitude={latitude} anchor="bottom">
            <Image
              src="assets/images/icons/map-marker-black.svg"
              alt=""
              width={size}
              height={size}
              style={{ zIndex: "1000"}}
            />
          </Marker>
          <NavigationControl showCompass={false} position="top-left" />
        </Map>
      </MapWrapper>
    </Wrapper>
  );
}

export default Location;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  column-gap: 20px;
  width: 100%;
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme?.borderRadius?.base};
`;
