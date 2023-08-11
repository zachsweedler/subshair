"use client";
import React, { useCallback, useRef, useState } from "react";
import { Map, Marker } from "react-map-gl";
import styled from "styled-components";
import MapMarker from "../explore-page/marker/MapMarker";
import PropertyCard from "../property-cards/PropertyCard";

function MemoMarker({ map, array, children }) {
  return (
    <>
      {map ? (
        array.map((item, index) => (
          <div key={index}>
            <Marker
              longitude={item.longitude}
              latitude={item.latitude}
              anchor="center"
            >
               <MapMarker number={item.rent} />
            </Marker>
          </div>
        ))
      ) : (
        <Marker
          longitude={array.longitude}
          latitude={array.latitude}
          anchor="center"
        >
          {children}
        </Marker>
      )}
    </>
  );
}

function MapPreview() {
  const mapRef = useRef(null);
  const animationRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(null);

  const [view, setView] = useState({
    latitude: 41.739291,
    longitude: -70.71664,
    zoom: 16,
    pitch: 50,
    bearing: 0,
  });

  const rotateCamera = useCallback((timestamp) => {
    if (mapRef.current) {
      const newBearing = (timestamp / 276) % 360;
      setView((prev) => ({ ...prev, bearing: newBearing }));
      animationRef.current = window.requestAnimationFrame(rotateCamera);
    }
  }, []);

  const properties = [
    {
      longitude: -70.71664,
      latitude: 41.739291,
      rent: 3400,
      revShare: 12,
      address: "123 Beach St",
      city: "Wareham",
      state: "MA",
      images: ['/assets/images/marketing/hero-cape-cod.jpg'],
      unit: "",
    },
    {
      longitude: -70.723082,
      latitude: 41.74233,
      rent: 3200,
    },
    {
      longitude: -70.710068,
      latitude: 41.744484,
      rent: 2700,
    },
  ];

  const [selected] = useState(properties[0]);

  return (
    <MapWrapper>
      <Map
        ref={mapRef}
        {...view}
        onViewportChange={setView}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        style={{ width: "100%", height: "1150px"}}
        mapStyle="mapbox://styles/subshair/cl811pk9h004w14pfyw49lodp"
        scrollZoom={false}
        onLoad={() => {
          setIsMapLoaded(true);
          rotateCamera(0);
        }}
        dragPan={false}
        dragRotate={false}
      >
            <MemoMarker
              map
              array={properties}
              anchor="center"
            />
  
        {selected && (
          <MemoMarker
            array={selected}
            longitude={selected.longitude}
            latitude={selected.latitude}
            anchor="center"
          >
            <PropertyCard
              explore
              rent={selected.rent}
              revShare={selected.revShare}
              images={selected.images}
              address={selected.address}
              status={selected.status}
              city={selected.city}
              state={selected.state}
              style={{
                width: "300px",
                right: "-14px",
                top: "-250px",
              }}
            />
          </MemoMarker>
        )}
      </Map>
    </MapWrapper>
  );
}

export default MapPreview;

const MapWrapper = styled.div`
  height: 700px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
`;
