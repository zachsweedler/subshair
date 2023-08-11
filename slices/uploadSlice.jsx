import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "propertyUpload",
  initialState: {
    id: null,
    created_at: null,
    created_by: null,
    property_status: null,
    property_full_address: null,
    property_address: null,
    property_city: null,
    property_state: null,
    property_zip: null,
    property_country: null,
    property_unit_number: null,
    property_longitude: -82.524395,
    property_latitude: 27.926660,
    property_location: null,
    property_bedrooms: 1,
    property_bathrooms: 1,
    property_rent: null,
    property_rev_share: null,
    property_type: null,
    property_description: null,
    property_year_built: null,
    property_square_footage: null,
    property_lot_size: null,
    property_images: [],
    property_amenities: [],
    property_furnishing: null
  },
  reducers: {
    updateProperty: (state, action) => {
      const { payload } = action;
      // Update other fields
      Object.entries(payload).forEach(([fieldName, value]) => {
        if (fieldName === "property_amenities") {
          state.property_amenities = value;
        } else if (state.hasOwnProperty(fieldName)) {
          state[fieldName] = value;
        }
      });
    },
    clearForm: (state) => {
      state.id = null;
      state.created_at = null;
      state.created_by = null;
      state.property_status = null;
      state.property_full_address = null,
      state.property_address = null;
      state.property_city = null;
      state.property_state = null;
      state.property_zip = null;
      state.property_country = null;
      state.property_unit_number = null;
      state.property_longitude = -82.524395;
      state.property_latitude = 27.926660;
      state.property_location = null;
      state.property_bedrooms = 1;
      state.property_bathrooms = 1;
      state.property_rent = null;
      state.property_rev_share = null;
      state.property_type = null;
      state.property_description = null;
      state.property_year_built = null;
      state.property_square_footage = null;
      state.property_lot_size = null;
      state.property_images = [];
      state.property_amenities = [];
      state.property_furnishing = null;
    },
  },
});

export const { updateProperty, clearForm } = uploadSlice.actions;

export default uploadSlice.reducer;