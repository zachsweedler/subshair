'use client'
import Image from "next/image";
import React from "react";
import { Flex } from "../common/Flexboxes";
import styled from "styled-components";
import { H1, H2, H4, H5, Para } from "@/styles/StyledTypography";

function Testimonial({header, name, jobTitle, src}) {

  return (
    <>
      <Flex position="relative" width="100%" height="100%">
        <Image
          src={src}
          alt=""
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <CopyWrapper>
            <H2 white>{header}</H2>
            <Flex direction="column" rowGap="0px" width="100%">
                <H5 white>{name}</H5>
                <Para white style={{opacity: "70%"}}>{jobTitle}</Para>
            </Flex>
        </CopyWrapper>
      </Flex>
    </>
  );
}

export default Testimonial;


const CopyWrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background: linear-gradient(0deg, #000000 -16.62%, rgba(0, 0, 0, 0) 100%);
`