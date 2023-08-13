"use client";
import { Button } from "@/components/common/Button";
import { Flex } from "@/components/common/Flexboxes";
import { H5, Para } from "@/styles/StyledTypography";
import { supabaseClient } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function NoResults () {
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
        setSession(session)
      }
    };
    getId();
  }, []);

  return (

    <Wrapper isSession={session ? true : false}>
      <TextWrapper>
        <H5 medium>No Results</H5>
        <Para grey>
          Try changing or removing some of your filters or adjusting your search
          area.
        </Para>
      </TextWrapper>
      {!loading && !session &&
        <JoinWrapper>
            <JoinCopyWrapper>
              <Para medium>Stay Updated</Para>
              <Para grey>Get notified about new listings</Para>
            </JoinCopyWrapper>
            <Link href="/sign-up">
              <Button hoverAnimate>Sign Up</Button>
            </Link>
        </JoinWrapper>
      }
    </Wrapper>
 
  );
}



const Wrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  position: absolute;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 25%;
  width: 100%;
  max-width: 450px;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  z-index: 50;
  row-gap: 30px;
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
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    padding: 20px;
  }
`;

const JoinCopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px;
  align-items: start;
  text-align: start;
  @media screen and (max-width: 1000px) {
    text-align: center;
    align-items: center;
  }
`
