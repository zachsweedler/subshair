"use client";
import { useTheme } from "styled-components";
import TwoColSection from "./two-col-section/2ColSection";

function Product() {
  const theme = useTheme();

  return (
    <TwoColSection
      listArray={[
        {
          text: "Search listings by market & filter results to your needs.",
        },
        {
          text: "All listings are pre-vetted to be in Airbnb-friendly regulatory markets",
        },
        {
          text: "Easily contact landlords to inquire about leasing their property.",
        },
      ]}
      title="No More Cold Calling Landlords"
      text="Say goodbye to the traditional hassle of cold-calling landlords to find rental arbitrage properties. Introducing Subshair, your one-stop platform for finding curated & lucrative rental arbitrage deals!"
      buttonText="Join SubShair"
      buttonLink="/sign-up"
      imgSrc="/assets/images/marketing/subshair-explore-interface.jpg"
      labelText="Released"
      labelTextColor={theme.colors.alerts.success.light.text}
      labelBgColor={theme.colors.alerts.success.light.background}
    />
  );
}

export default Product;
