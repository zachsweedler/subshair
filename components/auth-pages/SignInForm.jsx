"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Flex } from "../common/Flexboxes";
import { H3, Para } from "@/styles/StyledTypography";
import Link from "next/link";
import Notification from "../common/Notification";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/utils/supabase";
import { Button } from "../common/Button";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorBox } from "./styles/StyledComponets";

function SignInForm({overlay, onClick}) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().required("This is a required field."),
    password: yup.string().required("This is a required field."),
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
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccess(true);
      if (overlay) {
        onClick
      } else {
        router.push("/")
      }
      router.refresh();
    }
  };

  return (
    <>
      <Flex direction="column" rowGap="40px" width={overlay ? "100%" : "400px"}>
        <Flex direction="column">
          <H3>Welcome Back</H3>
        </Flex>
        <Flex direction="column" rowGap="40px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" rowGap="20px">
              <Flex direction="column" rowGap="4px">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
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
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <Para red small>
                    {errors.password?.message}
                  </Para>
                )}
              </Flex>
              <Button hoverAnimate type="submit">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              {error && <ErrorBox>{error.message}</ErrorBox>}
            </Flex>
          </form>
        </Flex>
        <Flex direction="column" rowGap="9px">
          <Flex direction="row" columnGap="5px">
            <Para small grey>
              Dont have an account?
            </Para>
            <Link href="/sign-up">
              <Para small link style={{ cursor: "pointer" }}>
                Sign Up
              </Para>
            </Link>
          </Flex>
          {/* <Divider />
          <Link href="/forgot-pass">
            <Para small link style={{ cursor: "pointer" }}>
              Forgot Password
            </Para>
          </Link> */}
        </Flex>
      </Flex>
      {error && <Notification error text={error.message} />}
      {success && <Notification success text="Signed in successfully!" />}
    </>
  );
}

export default SignInForm;
