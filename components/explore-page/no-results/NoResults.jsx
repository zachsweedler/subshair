"use client";
import { Button } from "@/components/common/Button";
import { Flex } from "@/components/common/Flexboxes";
import { H5, Para } from "@/styles/StyledTypography";
import { supabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function NoResults() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState();

  useEffect(() => {
    const getId = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) {
        console.log("Error fetching user", error);
        setLoading(false);
      } else {
        setLoading(false);
        setSession(session);
      }
    };
    getId();
  }, []);

  return (
    <Wrapper isSession={session ? true : false}>
      <TextWrapper>
        <div>
          <H5 medium>No Results</H5>
          <Para grey>
            Try changing or removing some of your filters or adjusting your
            search area.
          </Para>
        </div>
        {!loading && !session && (
          <JoinWrapper>
            <JoinCopyWrapper>
              <Para medium>Get Notifed</Para>
              <Para grey>Sign up to hear about new listings</Para>
            </JoinCopyWrapper>
            <Link href="/sign-up" style={{width: "100%"}}>
              <Button hoverAnimate width="100%">
                Sign Up
              </Button>
            </Link>
          </JoinWrapper>
        )}
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  position: absolute;
  position: absolute;
  left: 50%;
  top: 200px;
  width: 100%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  align-items: start;
  z-index: 50;
  row-gap: 30px;
  height: 300px;
  @media screen and (max-width: 1000px) {
    max-width: calc(100% - 80px);
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  row-gap: 12px;
  padding: 40px;
  row-gap: 30px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  width: 100%;
  height: auto;
  background-color: white;
  background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  flex-direction: column;
  align-items: start;
  row-gap: 20px;

`;

const JoinCopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px;
  align-items: start;
  text-align: start;
`;
