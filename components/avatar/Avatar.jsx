'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Flex } from "../common/Flexboxes";
import { H4, Para } from "@/styles/StyledTypography";
import Notification from "../common/Notification";
import { supabaseClient } from "@/utils/supabase";

function Avatar({
  withInfo,
  withEdit,
  bigBool,
  profile,
}) {
  const avatarInputRef = useRef();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [newVersion, setNewVersion] = useState(null);
  const id = profile?.id;

  useEffect(()=>{
    console.log('id', profile)
  },[id])

  const handleEditClick = () => avatarInputRef.current.click();

  const handleVersionUpsert = async (timestamp, userId) => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .upsert({ id: userId, avatar_v: `${timestamp}` })
      .select('avatar_v')
      .eq('id', userId);
    if (error) {
      console.log("Upsert version error", error);
    } else {
      setNewVersion(data[0]?.avatar_v);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const timestamp = Date.now();
      const objectKey = `${id}/avatar/avatar?version=${timestamp}`;
      const { error } = await supabaseClient.storage
        .from("user-images")
        .upload(objectKey, file, {
          upsert: true,
          cacheControl: "3600",
        });
      if (error) {
        setError(error.message);
      } else {
        await handleVersionUpsert(timestamp, id);
        setSuccess("New avatar uploaded successfully");
      }
    }
  };

  const imgSrc = newVersion || profile?.avatar_v 
    ? `user-images/${id}/avatar/avatar?version=${newVersion || profile?.avatar_v}`
    : "assets/images/default-avatar/default-avatar.svg";

  return (
    <Flex direction="column" gap="14px">
        <>
          <Wrapper>
            <AvatarWrapper big={bigBool}>
              <Image src={imgSrc} alt="User Avatar" {...imageProps} />
            </AvatarWrapper>
            {withEdit && (
              <EditButton onClick={handleEditClick}>
                <Image src="assets/images/icons/edit-icon-black.svg" alt="Edit Icon" width="20" height="20" />
                <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} style={{ display: "none" }} />
              </EditButton>
            )}
            {success && <Notification success text={success} />}
            {error && <Notification error text={error} />}
          </Wrapper>
          {withInfo && (
            <Flex direction="column" align="center" padding="12px 0px">
              <H4>{profile?.first_name} {profile?.last_name}</H4>
              <Para grey>{profile?.email}</Para>
            </Flex>
          )}
        </>
    </Flex>
  );
}

export default Avatar;

const imageProps = {
  fill: true,
  priority: true,
  sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  style: {
    borderRadius: "100%",
    overflow: "hidden",
    cursor: "pointer",
    objectFit: "cover",
  }
};

const Wrapper = styled.div`
  position: relative;
`;

const AvatarWrapper = styled.div`
  width: ${({ big }) => (big ? "160px" : "25px")};
  height: ${({ big }) => (big ? "160px" : "25px")};
  border-radius: 100%;
  overflow: hidden;
`;

const EditButton = styled.div`
  width: auto;
  height: auto;
  padding: 12px;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 12;
  border-radius: 100%;
  background-color: ${({ theme }) => theme?.colors?.nuetral?.bgGrey};
  &:hover {
    background-color: ${({ theme }) => theme?.colors?.lightGrey};
    cursor: pointer;
  }
`;