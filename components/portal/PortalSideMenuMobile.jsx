"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Divider } from "../common/Divider";
import { useDispatch } from "react-redux";
import { clearForm } from "@/slices/uploadSlice";
import { usePathname } from "next/navigation";

export default function PortalSideMenuMobile ({onClick}) {
  const pathname = usePathname()
  const dispatch = useDispatch()

  const isMenuItemSelected = (menuItemPath) => {
    return pathname === menuItemPath;
  };

  const handleClickCreate = () => {
    dispatch(clearForm());
  };

  return (
    <>
      <Overlay onClick={onClick}/>
      <MenuWrapper>
        <Link href="/" style={{ padding: "0px 15px" }}>
          <Image
            onClick={(e) => e.stopPropagation()}
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
            <Link href="/portal/landlord/properties" style={{ width: "100%" }}>
              <MenuItem
                selected={isMenuItemSelected("/portal/landlord/properties")}
              >
                Manage
              </MenuItem>
            </Link>
            <Link href="/portal/account" style={{ width: "100%" }}>
              <MenuItem selected={isMenuItemSelected("/portal/account")}>
                Account
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </MenuWrapper>
    </>
)};

const MenuWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  max-width: 272px;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme?.colors?.white};
  box-shadow: ${({ theme }) => theme?.boxShadow?.light};
  padding: 30px;
  row-gap: 30px;
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
  padding: 15px 20px;
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

const Overlay = styled.div`
    background-color: #000000da;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
`