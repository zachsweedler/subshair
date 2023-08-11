'use client'
import { H4, Para } from "@/styles/StyledTypography"
import styled from "styled-components"
import { Button } from "./Button"
import { useRouter } from "next/navigation"

export default function Warning ({title, subtitle, confirmHref}) {
    const router = useRouter()
    return (
        <Overlay>
            <Wrapper>
                <H4>{title}</H4>
                <Para>{subtitle}</Para>
                <Button onClick={()=>router.push({confirmHref})}>Continue</Button>
                <Para>Cancel</Para>
            </Wrapper>
        </Overlay>
    )
}

const Overlay = styled.div`
    background-color: #0000009e;
`

const Wrapper = styled.div`
    max-width: 450px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`