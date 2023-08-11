"use client";
import { Button } from "@/components/common/Button";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Location from "./Location";
import Payments from "./Payments";
import { StepWrapper, Wrapper } from "./Styles";
import Rooms from "./Rooms";
import Furnishing from "./Furnishing";
import Amenities from "./Amenities";
import Description from "./Description";
import Images from "./Images";
import Type from "./Type";
import Size from "./Size";
import { Divider } from "@/components/common/Divider";
import Year from "./Year";
import { supabaseClient } from "@/utils/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import PageNav from "../page-nav/PageNav";

function PropertyForm() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const formRedux = useSelector((state) => state.propertyUpload);
  const router = useRouter()
  const params = useSearchParams()
  const editing = params.get('edit')

  useEffect(()=>{
    const getUserId = async () => {
      const {
        data: {user},
        error
      } = await supabaseClient.auth.getUser();
      if (error) {
        console.log("Error fetching user id", error);
      } else {
        setUser(user?.id)
      }
    }
    getUserId()
  },[])

  const validationSchema = yup.object().shape({
    property_full_address: yup
      .string()
      .min(5, "Address should be at least 5 characters long")
      .max(100, "Address should not exceed 100 characters")
      .matches(/^[0-9a-zA-Z\s,-.'#/]+$/, "Invalid address format")
      .required("This field is required"),
    property_rent: yup
      .number()
      .typeError("Invalid number format")
      .min(1, "The rent amount must be at least $1")
      .required("This field is required"),
    property_rev_share: yup
      .number()
      .typeError("Invalid number format")
      .min(1, "The revenue share must be at least 1%")
      .max(100, "The revenue share can't be greater than 100%")
      .required("This field is required"),
    property_square_footage: yup
      .number()
      .typeError("Invalid number format")
      .required("This field is required"),
    property_lot_size: yup
      .number()
      .typeError("Invalid number format")
      .required("This is a required field"),
    property_year_built: yup
      .number()
      .typeError("Invalid number format")
      .integer("Year can't have a decimal")
      .min(1500, `Year can't be earlier than 1500`)
      .max(new Date().getFullYear(), `Sorry, it's ${new Date().getFullYear()}, we don't allow time-traveling properties.`)
      .required('This is a required field'),
    property_type: yup
      .string()
      .required("This is a required field."),
    property_furnishing: yup
      .bool()
      .required("This is a required field."),
    property_amenities: yup
      .array()
      .min(3, "Please select up to 3 amenities")
      .required("This field is required"),
    property_description: yup
      .string()
      .max(1000, "Description should not exceed 1000 characters")
      .required("This field is required"),
    property_images: yup
      .array()
      .min(3, "Please upload at least 3 property images")
      .required('This field is required.')
  });

  const formik = useFormik({
    initialValues: {
      property_full_address: formRedux.property_full_address,
      property_unit_number: formRedux.property_unit_number,
      property_rent: formRedux.property_rent,
      property_rev_share: formRedux.property_rev_share,
      property_bedrooms: formRedux.property_bedrooms,
      property_bathrooms: formRedux.property_bathrooms,
      property_type: formRedux.property_type,
      property_square_footage: formRedux.property_square_footage,
      property_lot_size: formRedux.property_lot_size,
      property_year_built: formRedux.property_year_built,
      property_furnishing: formRedux.property_furnishing,
      property_amenities: formRedux.property_amenities,
      property_description: formRedux.property_description,
      property_images: formRedux.property_images
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const { created_by, created_at, property_status, id, ...rest} = formRedux
      const { data, error } = await supabaseClient
        .from('properties')
        .upsert({
          id: formRedux.id,
          property_status: 'Listed',
          ...rest
        })
        .select('*');
      if (error) {
        console.log('upsert rest of property data error', error);
        return;
      }
      router.push('/portal/landlord/properties')
    }
  })

  return (
    <>
      <PageNav title={editing ? "Edit Property" : "Create Listing"} top/>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Wrapper>
            {/* Location Step */}
            <StepWrapper>
                <Location dispatch={dispatch} formik={formik} formRedux={formRedux} />
            </StepWrapper>
            <Divider/>
             {/* Rooms Step */}
             <StepWrapper>
                <Rooms formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Type Step */}
            <StepWrapper>
                <Type dispatch={dispatch} formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Year Built Step */}
            <StepWrapper>
                <Year dispatch={dispatch} formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Size Step */}
            <StepWrapper>
                <Size  dispatch={dispatch} formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Numbers Step */}
            <StepWrapper>
                <Payments dispatch={dispatch} formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Furnishing */}
            <StepWrapper>
                <Furnishing dispatch={dispatch} formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Amenities */}
            <StepWrapper>
                <Amenities formRedux={formRedux} dispatch={dispatch} formik={formik} />
            </StepWrapper>
            <Divider/>
            {/* Description */}
            <StepWrapper>
               <Description formRedux={formRedux} dispatch={dispatch} formik={formik} />
            </StepWrapper>
            {/* Images */}
            <Divider/>
            <StepWrapper>
               <Images dispatch={dispatch} formRedux={formRedux} user={user} formik={formik}/>
            </StepWrapper>
            <PageNav>
              <Button type="submit" hoverAnimate>
                {editing ? "Save Changes" : "Create Listing"}
              </Button>
            </PageNav>
          </Wrapper>
        </form>
      </FormikProvider>
    </>
  );
}

export default PropertyForm;