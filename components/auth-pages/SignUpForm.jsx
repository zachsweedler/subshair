"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex } from "../common/Flexboxes";
import * as yup from "yup";
import Link from "next/link";
import { H3, Para } from "@/styles/StyledTypography";
import Notification from "../common/Notification";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/utils/supabase";
import { Button } from "../common/Button";
import { ErrorBox, InfoBox } from "./styles/StyledComponets";

function SignUpForm() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const validationSchema = yup.object().shape({
    email: yup.string().required("This is a required field"),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("No password provided."),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    const { data } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password
    })
    if (data.user && data.user.identities && data.user.identities?.length === 0) {
      setError("Account already exists");
      setLoading(false);
      setSuccess(false);
    } else {
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <>
      <Flex direction="column" rowGap="40px" width="100%" maxWidth="400px">
        <Flex direction="column">
          <H3>Create an Account</H3>
        </Flex>
        {success ? (
          <InfoBox>Please check your email&apos;s inbox to confirm your address.</InfoBox>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" rowGap="20px">
              <Flex direction="column" rowGap="4px">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="text"
                  label="Email"
                  name="email"
                  autoComplete="on"
                  {...register("email")}
                />
                {errors.email && (
                  <Para red small>
                    {errors.email.message}
                  </Para>
                )}
              </Flex>
              <Flex direction="column" rowGap="4px">
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  autoComplete="on"
                  label="Password"
                  {...register("password")}
                />
                {errors.email && (
                  <Para red small>
                    {errors.email.message}
                  </Para>
                )}
              </Flex>
              <Button hoverAnimate onClick={handleSubmit(onSubmit)}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
              {error && <ErrorBox>{error}</ErrorBox>}
            </Flex>
          </form>
        )}
        <Flex direction="row" columnGap="5px" align="center">
          <Para grey small>
            Already have an account
          </Para>
          <Link href="/sign-in">
            <Para small link>
              Sign In
            </Para>
          </Link>
        </Flex>
      </Flex>
      {success && <Notification success text="Please confirm your email." />}
      {error && <Notification error text={error} />}
    </>
  );
}

export default SignUpForm;

