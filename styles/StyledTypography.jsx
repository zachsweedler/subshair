'use client'
import styled from 'styled-components'

export const Para = styled.p`
  font-size: ${({ theme, small }) => ( small ? theme.fontSizes.psm : theme.fontSizes.p)};
  font-weight: ${({ theme, light, thin, medium }) => (
    light ? theme.fontWeights.text.psm :
    thin ? theme.fontWeights.text.psm :
    medium ? theme.fontWeights.text.h1 :
    theme.fontWeights.text.p
  )};
  color: ${({ theme, white, grey, red }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    red ? theme.colors.alerts.error.light.text :
    theme.colors.black
  )};
  line-height: ${({ theme }) => theme.lineHeight.p};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  @media screen and (max-width: 760px) {
    font-size: ${({ theme }) => (theme.fontSizes.mobile.p)};
  }
  :hover {
    text-decoration: ${({ theme, link }) => ( link? theme.textDecoration.underline : 'none')};
    cursor: ${props => props.link ? 'pointer' : 'default'};
  }
`;

export const A = styled.a`
  font-size: ${({ theme, small }) => ( small ? theme.fontSizes.psm : theme.fontSizes.p)};
  font-weight: ${({ theme, small, thin }) => (
    small ? theme.fontWeights.text.psm :
    thin ? theme.fontWeights.text.psm :
    theme.fontWeights.text.p
  )};
  color: ${({ theme, white, grey }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    theme.colors.black
  )};
  line-height: ${({ theme }) => theme.lineHeight.p};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  :hover {
    text-decoration: ${({ theme, link }) => ( link? theme.textDecoration.underline : 'none')};
    cursor: ${props => props.link ? 'pointer' : 'default'};
  }
`;


export const H1 = styled.h1`
  font-size: ${({ theme, hero }) => (
    hero ? theme.fontSizes.hero :
    theme.fontSizes.h1
  )};
  font-weight: ${({ theme, thin }) => (
    thin ? theme.fontWeights.text.psm :
    theme.fontWeights.text.h1
  )};
  color: ${({ theme, white, grey }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    theme.colors.black
  )};
  line-height: ${({ theme, hero }) => (
    hero ? theme.lineHeight.hero :
    theme.lineHeight.h1
  )};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  @media screen and (max-width: 760px) {
    font-size: ${({ theme }) => (theme.fontSizes.mobile.hero)};
  }
`;

export const H2 = styled.h2`
  font-size: ${({ theme }) => (theme.fontSizes.h2)};
  font-weight: ${({ theme, thin }) => (
    thin ? theme.fontWeights.text.psm :
    theme.fontWeights.text.h2
  )};
  color: ${({ theme, white, grey }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    theme.colors.black
  )};
  line-height: ${({ theme }) => theme.lineHeight.h2};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  @media screen and (max-width: 760px) {
    font-size: ${({ theme }) => (theme.fontSizes.mobile.h2)};
  }
`;

export const H3 = styled.h3`
  font-size: ${({ theme }) => (theme.fontSizes.h3)};
  font-weight: ${({ theme, thin }) => (
    thin ? theme.fontWeights.text.psm :
    theme.fontWeights.text.h3
  )};
  color: ${({ theme, white, grey }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    theme.colors.black
  )};
  line-height: ${({ theme }) => theme.lineHeight.h3};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  @media screen and (max-width: 760px) {
    font-size: ${({ theme }) => (theme.fontSizes.mobile.h3)};
  }
`;

export const H4 = styled.h4`
  font-size: ${({ theme }) => (theme.fontSizes.h4)};
  font-weight: ${({ theme, thin }) => (
    thin ? theme.fontWeights.text.psm :
    theme.fontWeights.text.h4
  )};
  color: ${({ theme, white, grey }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    theme.colors.black
  )};
  line-height: ${({ theme }) => theme.lineHeight.h4};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  @media screen and (max-width: 760px) {
    font-size: ${({ theme }) => (theme.fontSizes.mobile.h4)};
  }
`;

export const H5 = styled.h5`
  font-size: ${({ theme }) => (theme.fontSizes.h5)};
  font-weight: ${({ theme, thin }) => (
    thin ? theme.fontWeights.text.psm :
    theme.fontWeights.text.h5
  )};
  color: ${({ theme, white, grey }) => (
    white ? theme.colors.white :
    grey ? theme.colors.grey :
    theme.colors.black
  )};
  line-height: ${({ theme }) => theme.lineHeight.p};
  user-select: ${props => props.noSelect ? 'none' : 'auto'};
  @media screen and (max-width: 760px) {
    font-size: ${({ theme }) => (theme.fontSizes.mobile.h5)};
  }
`;