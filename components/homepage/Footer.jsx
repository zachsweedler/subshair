"use client";
import { Para } from "@/styles/StyledTypography";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Footer({detailPage}) {
  return (
    <Wrapper detailPage={detailPage ? true : false}>
      <Container detailPage={detailPage ? true : false}>
        <Links>
          <Link href="/">
            <Image
              src="/assets/images/brand/subshair-logo-black.svg"
              alt=""
              width={100}
              height={20}
            />
          </Link>
          <Link href="/">
            <Para link grey small>
              Terms of Service
            </Para>
          </Link>
          <Link href="/">
            <Para link grey small>
              Privacy Policy
            </Para>
          </Link>
          <Para grey small>
            © SubShair, LLC. 2023
          </Para>
        </Links>
        <Social>
          <Link href="/">
            <Image
              alt=""
              src="/assets/images/icons/tiktok-icon-black.svg"
              width={20}
              height={20}
            />
          </Link>
          <Link href="/">
            <Image
              alt=""
              src="/assets/images/icons/twitter-icon-black.svg"
              width={20}
              height={20}
            />
          </Link>
          <Link href="/">
            <Image
              alt=""
              src="/assets/images/icons/ig-icon-black.svg"
              width={20}
              height={20}
            />
          </Link>
          <Link href="/">
            <Image
              alt=""
              src="/assets/images/icons/linkedin-icon-black.svg"
              width={20}
              height={20}
            />
          </Link>
        </Social>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-top: ${({ theme }) => theme.border.base};
  height: auto;
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  margin: ${({detailPage}) => detailPage ? 'auto' : 'none'};
  width: 100%;
  max-width: ${({theme, detailPage}) => detailPage ? theme?.container?.width?.lg : '100%'};
  padding: 50px 0px 50px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    row-gap: 60px;
    align-items: start;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
`;
