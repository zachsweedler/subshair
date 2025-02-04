'use client'
import styled from 'styled-components'

export const Button = styled.button `
    background-color: ${({ theme, grey, white }) => (
      grey ? theme.colors.nuetral.bgGrey :
      white ? theme.colors.white :
      theme.colors.black
    )};
    color: ${({ theme, grey, darkGrey, white }) => (
      grey ? theme.colors.grey :
      darkGrey ? theme.colors.darkGrey :
      white ? theme.colors.black :
      theme.colors.white
    )};
    width: ${props => props.width || "auto"};
    margin: ${props => props.margin};
    font-size: ${({ theme, small }) => ( small ? theme.fontSizes.psm : theme.fontSizes.p)};
    position: relative;
    height: 40px;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    :hover {
        background-color: ${({ theme, grey, white }) => (
        grey ? theme.colors.nuetral.hoverGrey :
        white ? theme.colors.bgGrey :
        theme.colors.black
    )};
       cursor: pointer !important;
       transform: ${({ hoverAnimate }) => ( hoverAnimate ? 'scale(0.95)' : 'none')};
    }
    @media screen and (max-width: 1000px) {
      font-size: ${({ theme, small }) => ( small ? theme.fontSizes.psm : theme.fontSizes.mobile.p)};
    }
`