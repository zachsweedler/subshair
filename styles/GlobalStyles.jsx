"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
    }

    *:focus {
        outline: none;
    }

    html {
        overflow: hidden;
    }

    body {
        line-height: 1;
        padding: 0;
        margin: 0;   
        background-color: transparent;
        color: black;
        height: 100%;
        margin: auto;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    } 

    h1 {
        font-size: ${({ theme }) => theme.fontSizes.h1};
        font-weight: ${({ theme }) => theme.fontWeights.text.h1};
        color: ${({ theme }) => theme.colors.black}; 
    }

    h2 {
        font-size: ${({ theme }) => theme.fontSizes.h2};
        font-weight: ${({ theme }) => theme.fontWeights.text.h2};
        color: ${({ theme }) => theme.colors.black}; 
    }

    h3 {
        font-size: ${({ theme }) => theme.fontSizes.h3};
        font-weight: ${({ theme }) => theme.fontWeights.text.h3};
        color: ${({ theme }) => theme.colors.black}; 
    }

    h4 {
        font-size: ${({ theme }) => theme.fontSizes.h4};
        font-weight: ${({ theme }) => theme.fontWeights.text.h4};
        color: ${({ theme }) => theme.colors.black}; 
    }

    h5 {
        font-size: ${({ theme }) => theme.fontSizes.h5};
        font-weight: ${({ theme }) => theme.fontWeights.text.h5};
        color: ${({ theme }) => theme.colors.black}; 
    }


    p {
        line-height: 1.72;
        font-size: ${({ theme }) => theme.fontSizes.p};
    }

    a {
        outline: none;
        text-decoration: none !important;
        color: black;
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSizes.p};
        &:hover {
            text-decoration: underline;
        }
    }

    button {
        border: none;
        background-color: black;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: ${({ theme }) => theme.fontWeights.buttons.base};
    }

    button:disabled {
        opacity: 0.5;
    }

    label {
        font-size: ${({ theme }) => theme.fontSizes.psm}; 
        font-weight: ${({ theme }) => theme.fontWeights.text.p}; 
        color: ${({ theme }) => theme.colors.grey};
        margin-bottom: 5px;
    }

    input {
        border: ${({ theme }) => theme.border.base}; 
        width: 100%;
        font-size: ${({ theme }) => theme.fontSizes.p}; 
        padding: 18px 15px;
        background-color:  ${({ theme }) => theme.colors.white};
        border-radius: ${({ theme }) => theme.borderRadius.base}; 
        color: ${({ theme }) => theme.colors.black};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
        -webkit-box-shadow: rgba(255, 255, 255, 0.4) inset !important;
        -webkit-text-fill-color: ${({ theme }) =>
          theme.colors.black} !important;
    }

    input::placeholder {
        color: ${({ theme }) => theme.colors.grey}; 
    }

    input:focus {
        border: ${({ theme }) => theme.border.base}; 
    }

    input:hover {
        cursor: pointer;
    }

    input[type="checkbox"] {
        background-color: ${({ theme }) => theme.colors.nuetral?.bgGrey}; 
        border-radius: ${({ theme }) => theme.borderRadius.base};
        margin: 0;
        width: 25px;
        height: 25px;
        padding: 0px;
        appearance: none !important;
        outline: none !important;
        -webkit-appearance: none;
        cursor: pointer;
    }

    input[type="checkbox"]:checked {
        background-color: ${({ theme }) => theme.colors.black} !important; 
        background-image: url("https://pjiybecehatvdpefgnck.supabase.co/storage/v1/object/public/assets/images/icons/check-icon-white.svg?t=2023-06-18T02%3A37%3A54.486Z");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;
        border: none;
    }

    input[type="checkbox"]:hover {
        cursor: pointer;
    }

    input[type="checkbox"]:hover {
        font-size: ${({ theme }) => theme.fontSizes.p}; 
        cursor: pointer;
    }

    select {
        border: ${({ theme }) => theme.border.base}; 
        width: 100%;
        font-size: ${({ theme }) => theme.fontSizes.p}; 
        padding: 18px 15px;
        background-color:  ${({ theme }) => theme.colors.white};
        border-radius: ${({ theme }) => theme.borderRadius.base}; 
        color: ${({ theme }) => theme.colors.black};
        // Below is CSS for the down arrow:
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 0l5 5 5-5'/%3E%3C/svg%3E") no-repeat right center;
        background-size: 12px 12px;
        background-position: calc(100% - 12px) center;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    select:focus {
    }

    select:hover {
        cursor: pointer;
    }

    textarea {
        font-family: 'Poppins', sans-serif;
        width: 100% !important;
        min-height: 100px;
        margin: 0px;
        border: ${({ theme }) => theme.border.base} !important; 
        border-radius: ${({ theme }) => theme.borderRadius.base};
        overflow: hidden;
        outline: none;
        resize: vertical;
        border: none;
        line-height: 1.5;
        font-size: ${({ theme }) => theme.fontSizes.p}; 
        padding: 15px;
    }

    textarea:hover {
        cursor: pointer;
    }

    form {
        height: auto;
        width: 100%;
    }
    
    ::placeholder {
    color: ${({ theme }) => theme.colors.grey}; 
    opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.grey}; 
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.grey}; 
    }

`;
