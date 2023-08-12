'use client'
import styled from "styled-components"
import AmenitiesFilter from "../AmenitiesFilter"
import FurnishingFilter from "../FurnishingFilter"
import PriceFilter from "../PriceFilter"
import RevShareFilter from "../RevShareFilter"
import RoomsFilter from "../RoomsFilter"
import { Divider } from "@/components/common/Divider"
import { H5, Para } from "@/styles/StyledTypography"
import { useDispatch } from "react-redux"
import { clearFilters } from "@/slices/filterSlice"
import { Button } from "@/components/common/Button"
import PropertyTypeFilter from "../PropertyTypeFilter"

export default function FilterPopup ({searchCount, handleFilterSearch}) {

    const dispatch = useDispatch()

    return (
        <Overlay>
            <Menu>
                <MenuWrapper>
                    <TopBar>
                        <H5>Filters</H5>
                    </TopBar>
                    <PriceFilter/>
                    <Divider/>
                    <RevShareFilter/>
                    <Divider/>
                    <RoomsFilter/>
                    <Divider/>
                    <PropertyTypeFilter/>
                    <Divider/>
                    <FurnishingFilter/>
                    <Divider/>
                    <AmenitiesFilter/>
                    <BottomBar>
                        <Para link grey onClick={()=>dispatch(clearFilters())}>Clear All</Para>
                        <Button hoverAnimate onClick={handleFilterSearch}>Show {searchCount} results</Button>
                    </BottomBar>
                </MenuWrapper>
            </Menu>
        </Overlay>
    )
}


const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 12000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000099;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 30px;
`

const Menu = styled.div`
    max-width: 600px;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    overflow: hidden;
`

const MenuWrapper = styled.div`
    max-width: 600px;
    width: 100%;
    max-height: 80vh; 
    overflow: auto; 
    display: flex;
    flex-direction: column;
    position: relative;
`;


const BottomBar = styled.div`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 600px;
    width: 100%;
    height: auto;
    padding: 20px;
    bottom: 0;
    left: 0;
    border-top: ${({ theme }) => theme.border.base}; ;
    background-color: white;
`


const TopBar = styled.div`
    position: sticky;
    display: flex;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    max-width: 600px;
    width: 100%; 
    height: auto;
    padding: 20px;
    bottom: 0;
    top: 0;
    border-bottom: ${({ theme }) => theme.border.base}; ;
    background-color: white;
`

