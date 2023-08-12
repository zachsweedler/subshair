"use client";
import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { Button } from "../common/Button";
import styled from "styled-components";
import { H4, H5, Para } from "@/styles/StyledTypography";
import { supabaseClient } from "@/utils/supabase";
import Notification from "../common/Notification";
import { Flex } from "../common/Flexboxes";
import { Divider } from "../common/Divider";
import { useRouter } from "next/navigation";

function AccountInfoForm({ profile, userEmail }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const validationSchema = yup.object().shape({
    first_name: yup.string().required("This field is required"),
    last_name: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: userEmail
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const { error } = await supabaseClient
        .from("profiles")
        .update({
          first_name: formik.values.first_name,
          last_name: formik.values.last_name,
        })
        .eq("id", profile.id);
      if (error) {
        console.log("error updating profile", error);
        setError(error);
        setLoading(false);
      }

      const { error: updateEmailError } = await supabaseClient
        .auth
        .updateUser({
          email: formik.values.email
      })
      if (updateEmailError) {
        console.log('error updating user email', updateEmailError)
        setError(error);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
        router.refresh();
      }
    },
  });

  const handleSignOut = async () => {
    setError(null);
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      setError(error);
    } else {
      router.refresh();
    }
  };

  return (
    <Container>
      <Wrapper>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <SectionWrapper>
              <H4>Basic</H4>
              <InputWrapper>
                <label>Email</label>
                <input
                  name="email"
                  placeholder="email"
                  type="text"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldTouched("email");
                    formik.handleChange(e);
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Para red small>
                    {formik.errors.email}
                  </Para>
                ) : null}
              </InputWrapper>
              <TwoInputWrapper>
                <InputWrapper>
                  <label>First Name</label>
                  <input
                    name="first_name"
                    placeholder="First Name"
                    type="text"
                    onChange={(e) => {
                      formik.setFieldTouched("first_name");
                      formik.handleChange(e);
                    }}
                    value={formik.values.first_name}
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <Para red small>
                      {formik.errors.first_name}
                    </Para>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <label>Last Name</label>
                  <input
                    name="last_name"
                    placeholder="Last Name"
                    type="text"
                    onChange={(e) => {
                      formik.setFieldTouched("last_name");
                      formik.handleChange(e);
                    }}
                    value={formik.values.last_name}
                  />
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <Para red small>
                      {formik.errors.last_name}
                    </Para>
                  ) : null}
                </InputWrapper>
              </TwoInputWrapper>
              {error && <Notification error text={error.message} />}
              {success && (
                <Notification success text="Profile updated succesfully!" />
              )}
              <Button
                hoverAnimate
                type="submit"
                disabled={
                  formik.values.first_name === profile.first_name &&
                  formik.values.last_name === profile.last_name &&
                  formik.values.email === userEmail
                }
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </SectionWrapper>
          </form>
        </FormikProvider>
        <Divider />
        <SectionWrapper>
          <H4>Billing</H4>
          <Plan>
            <H5>Plan</H5>
            {profile.is_subscribed ? (
              <Para>SubShair Plus</Para>
            ) : (
              <Flex direction="row" columnGap="5px">
                <Para grey>Free |</Para>
                <Para>Paid Plan Coming Soon</Para>
              </Flex>
            )}
          </Plan>
          <PaymentMethod>
            <H5>Payment Method</H5>
            {profile.is_subscribed ? (
              <Para>Method 1234</Para>
            ) : (
              <Para>Coming Soon</Para>
            )}
          </PaymentMethod>
        </SectionWrapper>
        <Divider />
        <SectionWrapper>
          <Para onClick={handleSignOut} link grey>
            Sign Out
          </Para>
        </SectionWrapper>
      </Wrapper>
    </Container>
  );
}

export default AccountInfoForm;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 70px;
  width: 100%;
  align-items: start;
  max-width: 700px;
  margin: auto;
  padding-bottom: 130px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  width: 100%;
`;

const TwoInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  width: 100%;
`;

const Plan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: ${({ theme }) => theme.border.base};
`;

const PaymentMethod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: ${({ theme }) => theme.border.base};
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
`;
