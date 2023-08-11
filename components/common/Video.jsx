import React from "react";
import { Flex } from "./Flexboxes";

function Video({ src }) {
  return (
    <Flex width="100%" height="100%" position="relative">
        <video
          muted
          autoPlay
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={src} />
        </video>
    </Flex>
  );
}

export default Video;
