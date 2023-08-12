import SignInForm from "@/components/auth-pages/SignInForm";
import Testimonial from "@/components/auth-pages/Testimonial";
import { Grid, GridItem } from "@/components/auth-pages/styles/StyledComponets";
import React from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In | SubShair",
};

async function SignIn() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <Grid>
      <GridItem>
        <SignInForm />
      </GridItem>
      <Testimonial
        src="/assets/images/marketing/sign-in-image2.png"
        header="''SubShair lets me capitalize on Airbnb while hedging the vacancy risk.''"
        name="Rose S."
        jobTitle="Landlord"
      />
    </Grid>
  );
}

export default SignIn;
