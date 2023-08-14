"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "../common/Button";
import { Para } from "@/styles/StyledTypography";

function NavClient({ children, session }) {
  const pathname = usePathname();
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(document.body.scrollTop > 0);
    };
    document.body.addEventListener("scroll", handleScroll);
    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {pathname.startsWith("/portal") ? null : (
        <>
          {pathname.startsWith("/explore/property/") || pathname === "/explore" ? null : (
            <NavBackground isVisible={navVisible} />
          )}
          <NavFlex pathname={pathname}>
            <Link href="/">
              <LogoFlex>
                <Image
                  src="assets/images/brand/subshair-icon-black.svg"
                  width="20"
                  height="20"
                  alt="subshair-icon-logo"
                  priority
                  style={{ cursor: "pointer" }}
                />
                <Image
                  src="assets/images/brand/subshair-type-black.svg"
                  width="104"
                  height="23"
                  alt="subshair-type-logo"
                  priority
                  style={{ cursor: "pointer" }}
                />
              </LogoFlex>
            </Link>
            {pathname.startsWith("/sign-up") ||
            pathname.startsWith("/sign-in") ? null : !session ? (
              <SignUpFlex>
                <Link href="/sign-in"><Para>Sign In</Para></Link>
                <Link href="/sign-up">
                  <Button hoverAnimate>Sign Up</Button>
                </Link>
              </SignUpFlex>
            ) : (
              // avatar server component is passed in here via children prop of this client component
              children
            )}
          </NavFlex>
        </>
      )}
    </>
  );
}

export default NavClient;

const slideIn = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 0;
  }
`;

const slideOut = keyframes`
  0% {
    top: 0;
  }
  100% {
    top: -100%;
  }
`;

const NavBackground = styled.div`
  position: fixed;
  display: ${({ pathname }) => pathname === "/explore" ? "none" : "flex"};
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  height: 80px;
  width: 100vw;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 600;
  box-shadow: 0px 2px 1.5px 0px rgba(0, 0, 0, 0.03);
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0s
    ease-in-out forwards;
`;

const NavFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.container.padding.nav};
  max-width: ${({ theme, pathname }) =>
    pathname.startsWith("/explore/property")
      ? theme.container.width.md
      : pathname === "/explore" ||
        pathname === "/sign-in" ||
        pathname === "/sign-up"
      ? theme.container.width.nav
      : theme.container.width.lg};
  margin: 0 auto;
  flex-direction: row;
  gap: 20px;
  position: ${({ pathname }) =>
    pathname.startsWith("/explore/property/") || pathname === "/explore" ? "static" : "fixed"};
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 900;
  height: 80px;
`;

const LogoFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SignUpFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  align-items: center;
  justify-content: space-between;
`;
