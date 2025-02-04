"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearForm } from "@/slices/uploadSlice";
import { Divider } from "../common/Divider";

function PortalLayout({ children, user }) {
  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch();

  const isMenuItemSelected = (menuItemPath) => {
    return pathname === menuItemPath;
  };

  const handleClickCreate = () => {
    dispatch(clearForm());
  };

  return (
    <>
      <MainWrapper>
        <MenuWrapper>
          <Link href="/" style={{padding: "0px 15px"}}>
            <Image 
              onClick={(e)=> e.stopPropagation()}
              alt=""
              src="/assets/images/brand/subshair-icon-black.svg"
              width={30}
              height={30}
            />
          </Link>
          <Menu>
            <MenuList>
              <Link href="/explore" passHref style={{ width: "100%" }}>
                <MenuItem>Explore</MenuItem>
              </Link>
              <Divider />
              <Link href="/portal/landlord/upload" style={{ width: "100%" }}>
                <MenuItem
                  onClick={handleClickCreate}
                  selected={isMenuItemSelected("/portal/landlord/upload")}
                >
                  Create +
                </MenuItem>
              </Link>
              <Link
                href="/portal/landlord/properties"
                style={{ width: "100%" }}
              >
                <MenuItem
                  selected={isMenuItemSelected("/portal/landlord/properties")}
                >
                  Manage
                </MenuItem>
              </Link>
              <Link
                href="/portal/account"
                style={{ width: "100%" }}
              >
                <MenuItem
                  selected={isMenuItemSelected("/portal/account")}
                >
                  Account
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </MenuWrapper>
        <PageWrapper
          fitContent={
            pathname === "/portal/landlord/upload" ||
            pathname === `/portal/tenant/explore/property/${params?.slug}` ||
            pathname === `/portal/account` ||
            pathname === "/portal/landlord/properties"
              ? true
              : false
          }
          noPadding={pathname === "/portal/tenant/explore" ? true : false}
        >
          <PageContent
            noPadding={pathname === "/portal/tenant/explore" ? true : false}
          >
            {children}
          </PageContent>
        </PageWrapper>
      </MainWrapper>
    </>
  );
}

export default PortalLayout;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 0px;
  width: 100vw;
  height: auto;
  background-color: ${({ theme }) => theme?.colors?.nuetral?.lightBgGrey};
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  row-gap: 90px;
  width: 100%;
  padding: 30px;
  max-width: 272px;
  background-color: ${({ theme }) => theme?.colors?.white};
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: ${({ theme }) => theme?.border?.base};
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 70px;
  width: 100%;
`;

const MenuList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const MenuItem = styled.div`
  display: flex;
  padding: 15px 15px;
  align-items: flex-start;
  border-radius: 5px;
  width: 100%;
  gap: 10px;
  font-size: ${({ theme }) => theme?.fontSizes?.p};
  align-self: stretch;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "black" : "transparent")};
  text-decoration: none !important;
  transition: 0.5s transform cubic-bezier(0.19, 1, 0.22, 1);
  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? "black" : theme?.colors?.nuetral?.bgGrey};
    color: ${(props) => (props.selected ? "white" : "black")};
    text-decoration: none !important;
    transform: ${(props) => (props.selected ? "none" : "scale(0.95);")};
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: ${(props) => (props.fitContent ? "100%" : "100vh")};
  width: 100%;
  padding: ${({ noPadding }) => (noPadding ? "0px 50px" : "130px 50px")};
  background-color: ${({ theme }) => theme?.colors?.nuetral?.lightBgGrey};
  @media screen and (max-width: 900px) {
    padding: ${({ noPadding }) => (noPadding ? "0px 20px" : "120px 25px")};
  }
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;
