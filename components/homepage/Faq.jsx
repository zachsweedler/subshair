"use client";
import { H1, H2, H5 } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";
import Accordion from "@/components/accordian/Accordian";

function Faq() {
  const qas = [
    {
      question: "What does it mean to “SubShair” a property?",
      answer:
        "Renting a property with the intention of listing it on platforms like Airbnb (or other short-term rental platforms) and sharing a portion of the revenue generated from those listings with the landlord, in addition to paying the regular rent. This model ensures that both the tenant and the landlord benefit from the property's success on short-term rental platforms.",
    },
    {
      question: "What should my lease agreement look like?",
      answer:
        "Your lease agreement should clearly outline the terms of the rental and the revenue-sharing model with the landlord. It should mention the percentage or amount of short-term rental revenue to be shared, the regular rent amount, the duration of the lease, and other standard lease terms. Given the unique nature of SubShair's model, it might be beneficial to consult with a legal expert familiar with rental arbitrage and short-term rentals.",
    },
    {
      question: "How do I know I’ll be profitable?",
      answer:
        "Profitability in rental arbitrage hinges on various factors including the location of the property, its appeal to short-term renters, your operational costs, and the terms of your lease and revenue-sharing agreement. SubShair offers forecasting tools to help predict potential earnings before you sign a lease.",
    },
    {
      question: "What if my city doesn’t allow Airbnb or similar platforms?",
      answer:
        "If your city has regulations against Airbnb or similar platforms, it's essential to be aware and compliant. Operating in violation can lead to fines or legal action. This is why SubShair gaurentees listings only in STR-regulation-friendly markets. Our proprietary regulations database is maintained daily to ensure that all listing pages are up to date.",
    },
  ];

  return (
    <Grid>
      <StickyWrapper>
        <H2>Your questions, <br/>answered:</H2>
      </StickyWrapper>
      <Accordion qas={qas} />
    </Grid>
  );
}

export default Faq;

const StickyWrapper = styled.div`
  position: sticky;
  top: 150px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1000px) {
    position: relative;
    top: 0;
  }
`;

const Grid = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  position: relative;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    row-gap: 50px;
  }
`;
