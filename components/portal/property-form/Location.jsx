'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Map, Marker, NavigationControl } from 'react-map-gl';
import { InputWrapper, MapWrapper } from './Styles';
import { H4, Para } from '@/styles/StyledTypography';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useTheme } from 'styled-components';
import { updateProperty } from '@/slices/uploadSlice';

function Location({dispatch, formRedux, formik}) {

    const theme = useTheme();

    const handleAddressSelect = async (res) => {
        const feature = await res.features[0];
        const {
          geometry: { coordinates },
          properties: {
            full_address,
            address_line1,
            address_level2,
            address_level1,
            country_code,
            postcode,
          },
        } = feature;
        dispatch(
          updateProperty({
            property_full_address: full_address,
            property_latitude: coordinates[1],
            property_longitude: coordinates[0],
            property_location: `POINT(${coordinates[0]} ${coordinates[1]})`,
            property_address: address_line1,
            property_city: address_level2,
            property_state: address_level1,
            property_country: country_code,
            property_zip: postcode,
          })
        );
        formik.setFieldValue("property_full_address", full_address);
      };
    
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
        cssText: `
          .Input {
            padding: 0px 30px;
          }
          .ResultsAttribution {
            display: none !important;
          }
        `,
      };
    
      const [view, setView] = useState({
        longitude: formRedux.property_latitude,
        latitude: formRedux.property_longitude,
        zoom: 18,
      });
    
      useEffect(() => {
        setView((prevView) => ({
          ...prevView,
          longitude: formRedux.property_longitude,
          latitude: formRedux.property_latitude,
        }));
      }, [formRedux.property_latitude, formRedux.property_longitude]);

  return (
    <>
    <H4>Location</H4>
    <InputWrapper>
      <label htmlFor="property_full_address">Address</label>
      <AddressAutofill
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        onRetrieve={(res) => handleAddressSelect(res)}
        theme={autoFillTheme}
        options={{ language: "en" }}
      >
        <input
          onFocus={(e) => {
            e.target.setAttribute("autocomplete", "off");
          }}
          onChange={(e) => {
            formik.setFieldTouched('property_full_address');
            formik.handleChange(e);
            e.target.setAttribute("autocomplete", "off");
          }}
          name="property_full_address"
          placeholder="123 Main Street"
          value={formik.values?.property_full_address}
          type="text"
        />
      </AddressAutofill>
      {formik.touched.property_full_address &&
        formik.errors.property_full_address ? (
          <Para red small>
            {formik.errors.property_full_address}
          </Para>
        ): null}
    </InputWrapper>
    <InputWrapper>
      <label htmlFor="property_unit_number">Unit Number (Optional)</label>
      <input
        name="property_unit_number"
        placeholder="123A"
        type="text"
        onChange={(e) => {
          formik.setFieldTouched('property_unit_number');
          formik.handleChange(e);
          dispatch(
            updateProperty({ property_unit_number: e.target.value })
          );
        }}
        value={formik.values.property_unit_number}
      />
    </InputWrapper>
    { formRedux.property_full_address &&
    <MapWrapper>
      <Map
        {...view}
        onMove={(evt) => setView(evt.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/subshair/cl811pk9h004w14pfyw49lodp"
        dragPan={false}
        scrollZoom={false}
      >
        <Marker
          longitude={formRedux.property_longitude}
          latitude={formRedux.property_latitude}
          anchor="bottom"
        >
          <Image
            src="assets/images/icons/map-marker-black.svg"
            alt=""
            width={50}
            height={50}
            style={{ zIndex: "1000" }}
          />
        </Marker>
        <NavigationControl
          showCompass={false}
          position="bottom-left"
        />
      </Map>
    </MapWrapper>
    }
    </>
  )
}

export default Location

