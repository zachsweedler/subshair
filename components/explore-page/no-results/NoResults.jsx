"use client";
import { Button } from "@/components/common/Button";
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
        <H5>No Results</H5>
        <Para grey>
          Try changing or removing some of your filters or adjusting your search
          area.
        </Para>
      </TextWrapper>
      {!loading && !session &&
        <JoinWrapper>
            <Para>Sign up to get notified about new listings</Para>
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
  transform: translate(-50%, -50%);
  top: ${({isSession})=> isSession ? '90px' : '150px'};
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  z-index: 50;
  row-gap: 30px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 3px;
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;
