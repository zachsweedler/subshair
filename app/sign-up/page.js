import SignUpForm from "@/components/auth-pages/SignUpForm";
import Testimonial from "@/components/auth-pages/Testimonial";
import { Grid, GridItem } from "@/components/auth-pages/styles/StyledComponets";
import Container from "@/components/common/Containers";
import React from "react";


export const metadata = {
  title: "Create SubShair Account",
};


function SignUp() {
  return (
    <Container>
      <Grid>
        <GridItem>
          <SignUpForm />
        </GridItem>
        <Testimonial
          src="/assets/images/marketing/sign-up-image3.png"
          header="''SubShair was my key hosting my dream Airbnb with little upfront cost.''"
          name="Victoria A."
          jobTitle="SubShair Tenant"
        />
      </Grid>
    </Container>
  );
}

export default SignUp;
