'use client'
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    city: null,
    state: null,
    rentMin: 0,
    rentMax: 10000,
    revShareMin: 0,
    revShareMax: 100,
    propertyType: '',
    bedrooms: "*",
    bathrooms: "*",
    amenities: [],
    furnishing: '',
    searchLongitude: null,
    searchLatitude: null,
    searchZoom: null,
    searchBbox: null,
    searchFeatureType: null,
  },
  reducers: {
    updateFilter: (state, action) => {
      const { filterName, value } = action.payload;
      state[filterName] = value;
    },
    clearFilters: (state) => {
      state.city = null,
      state.state = null,
      state.rentMin = 0,
      state.rentMax = 10000,
      state.revShareMin = 0,
      state.revShareMax = 100,
      state.propertyType = '',
      state.bedrooms = "*",
      state.bathrooms = "*",
      state.amenities = [],
      state.furnishing = ''
    }
  }
});

export const { updateFilter, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;

