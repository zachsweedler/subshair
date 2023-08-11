"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../common/Input";
import { Flex } from "../common/Flexboxes";
import * as yup from "yup";
import Link from "next/link";
import { H2, H3, Para } from "@/styles/StyledTypography";
import Notification from "../common/Notification";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/utils/supabase";
import { Button } from "../common/Button";

function SignUpForm() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

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

  const onSubmit = (formData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    supabaseClient.auth
      .signUp({
        email: formData.email,
        password: formData.password,
      })
      .then(({ error }) => {
        if (error) {
          console.log(error);
          setError(error.message);
          setLoading(false);
        } else {
          setError(false);
          setLoading(false);
          setSuccess(true);
          router.push("/explore");
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        setSuccess(false);
      });
  };

  const handleShowHide = () => {
    setPassType((prevPassType) =>
      prevPassType === "password" ? "text" : "password"
    );
    setIconRight((prevIcon) =>
      prevIcon === "/assets/images/icons/show-icon-black.svg"
        ? "/assets/images/icons/hide-icon-black.svg"
        : "/assets/images/icons/show-icon-black.svg"
    );
  };

  return (
    <div>
      <Flex direction="column" rowGap="40px" width="400px">
        <Flex direction="column">
          <H3>Create an Account</H3>
        </Flex>
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
          </Flex>
        </form>
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
      {success && <Notification success text="Account created successfully" />}
      {error && <Notification error text={error} />}
    </div>
  );
}

export default SignUpForm;
