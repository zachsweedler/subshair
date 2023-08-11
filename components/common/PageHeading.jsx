import Link from 'next/link'
import React from 'react'
import { Flex } from './Flexboxes'
import { H2, H3, Para } from '@/styles/StyledTypography'
import { Button } from './Button'

function PageHeading({title, subtitle, href, buttonText, style}) {
  return (
    <Flex width="100%" justify="space-between" align="end" style={style}>
        <Flex direction="column" rowGap="0px">
            <H3>{title}</H3>
            <Para grey>{subtitle}</Para>
        </Flex>
        { href &&
        <Link href={href}>
            <Button hoverAnimate>{buttonText}</Button>
        </Link>
        }
    </Flex>
  )
}

export default PageHeading