"use client";
import { Button } from "@/components/common/Button";
import { Flex } from "@/components/common/Flexboxes";
import FeaturedList from "@/components/propertyCards/home-page/FeaturedList";
import { H1 } from "@/styles/StyledTypography";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

function Featured() {
  return (
    <Flex direction="column" rowGap="50px">
      <HeadingWrapper>
        <H1>Featured</H1>
        <Link href="/explore">
          <Button>Explore All Listings</Button>
        </Link>
      </HeadingWrapper>
      <FeaturedList />
    </Flex>
  );
}

export default Featured;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: end;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
    row-gap: 30px;
  }
`;
