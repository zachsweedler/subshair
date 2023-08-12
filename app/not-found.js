import { Flex } from "@/components/common/Flexboxes";
import { H1, Para } from "@/styles/StyledTypography";

export default function NotFound() {
  return (
    <Flex width="100vw" direction="column" height="100vh" justify="center" align="center">
       <H1 style={{fontSize: "200px"}}>404</H1>
       <Para>The page you&apos;re looking for does not exist</Para>
    </Flex>
  );
}

