"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../common/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearForm, updateProperty } from "@/slices/uploadSlice";
import { supabaseClient } from "@/utils/supabase";
import { H2, H3, H4, Para } from "@/styles/StyledTypography";
import PropertyCard from "@/components/property-cards/PropertyCard";
import PageNav from "../page-nav/PageNav";
import Link from "next/link";
import { LottiePlayer } from "lottie-react";
import loadingAnimation from "../../../public/loading.json";
import Image from "next/image";
import { Flex } from "@/components/common/Flexboxes";

function PropertyGrid({data, count}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState();
  const [loading, setLoading] = useState()
  const [properties, setProperties] = useState(data);
  const [propertyCount, setPropertyCount] = useState(count)

  // load-more pagination states
  const [batch, setBatch] = useState(1);
  const [limit] = useState(8);

  // fetch more user's properties
    const fetchMoreProperties = async () => {
      setBatch(batch + 1)
      setLoading(true)
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      const {
        data,
        error,
        count,
      } = await supabaseClient
        .from("properties")
        .select("*", { count: 'exact' })
        .eq("created_by", session?.user?.id)
        .range(batch * limit - limit, batch * limit - 1)
        .order("created_at", { ascending: false });
      if (error) {
        setLoading(false)
        console.log("Error fetching properties:", error);
      } else {
        setLoading(false)
        if (batch === 1) {
          setProperties(data);
        } else {
          setPropertyCount(count)
          setProperties((prevProperties) => [
            ...prevProperties,
            ...data,
          ]);
        }
      }
    };

  // onClick of the edit / finish draft property button
  const onEditClick = (event, index) => {
    event.stopPropagation();
    dispatch(updateProperty(properties[index]));
    router.push(`/portal/landlord/upload/?edit=${properties[index].id}`);
  };

  // onClick of the three dots button which opens the dropdown with more action options.
  const onMenuClick = (index) => {
    if (cardIndex === index) {
      setCardIndex(null);
    } else {
      setCardIndex(index);
    }
  };

  // this tells the app what menu items to list for a given property based on its current property_status.
  const menuItems = (index) => {
    const { property_status: status, id } = properties[index];
    switch (status) {
      case "Listed":
        return [
          { label: "Unlist", id },
          { label: "Delete", id },
        ];
  
      case "Unlisted":
        return [
          { label: "List", id },
          { label: "Delete", id }
        ];
  
      case "Draft":
        return [{ label: "Delete", id }];
  
      default:
        console.warn(`Unexpected property status: ${status}`);
        return [];
    }
  };

  // depending on the clicked menu item value, it will handle differently.
  const handleMenuItems = async (item) => {
    switch (item.label) {
      case "Delete":
        const { error: deleteError } = await supabaseClient
          .from("properties")
          .delete()
          .eq("id", item.id);
        if (deleteError) {
          console.log("Error deleting property", deleteError);
        } else {
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== item.id)
          );
        }
        break;
      case "List":
        const { data: listData, error: listError } = await supabaseClient
          .from("properties")
          .update({ property_status: "Listed" })
          .eq("id", item.id)
          .select()
        if (listError) {
          console.log("Error listing property", listError);
        } else {
          setProperties((prevProperties) => 
            prevProperties.map((property) => 
            property.id === item.id ? { ...property, property_status: listData[0]?.property_status } : property
          ))
        }
        break;
      case "Unlist":
        const { data: unlistData, error: unlistError } = await supabaseClient
          .from("properties")
          .update({ property_status: "Unlisted" })
          .eq("id", item.id)
          .select()
        if (unlistError) {
          console.log("Error unlisting property", unlistError);
        } else {
          setProperties((prevProperties) => 
            prevProperties.map((property) => 
            property.id === item.id ? { ...property, property_status: unlistData[0]?.property_status } : property
          ))
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <PageNav title="Manage Listings" subtitle="results" top>
        <Link href="/portal/landlord/upload">
          <Button hoverAnimate onClick={()=>dispatch(clearForm())}>+ Create Listing</Button>
        </Link>
      </PageNav>
      {!loading ? (
        <>
          {properties.length > 0 ? (
            <Wrapper>
              <Grid>
                {properties.map((item, index) => {
                  return (
                    <PropertyCard
                      key={item.id}
                      images={item.property_images}
                      status={item.property_status}
                      address={item.property_address}
                      unitNumber={item.property_unit_number}
                      city={item.property_city}
                      state={item.property_state}
                      rent={item.property_rent}
                      revShare={item.property_rev_share}
                      menuItems={menuItems(index)}
                      handleMenuItems={handleMenuItems}
                      cardIndex={cardIndex}
                      index={index}
                      onMenuClick={() => onMenuClick(index)}
                      onEditClick={(event) => onEditClick(event, index)}
                      type="manage"
                      explore={false}
                    />
                  );
                })}
              </Grid>
              <Pagination>
                {properties.length === propertyCount ? (
                  <Para grey>No more properties to show</Para>
                ) : (
                  <Button hoverAnimate onClick={() => fetchMoreProperties()}>Load More</Button>
                )}
              </Pagination>
            </Wrapper>
          ) : (
            <EmptyWrapper>
              <Flex direction="column" rowGap="5px">
              <H3>No Properties Added Yet</H3>
              <Para grey>Interested listing your property on SubShair?</Para>
              </Flex>
              <Link href="/portal/landlord/upload">
                <Button hoverAnimate>Create Listing +</Button>
              </Link>
              <ImageWrapper>
                <Image
                  src="/assets/images/marketing/properties-empty-image.png"
                  alt=""
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </ImageWrapper>
            </EmptyWrapper>
          )}
        </>
      ) : (
        <LoadingWrapper>
            <LottiePlayer animationData={loadingAnimation} loop={true} />
        </LoadingWrapper>
      )}
    </>
  );
}

export default PropertyGrid;

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1150px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const LoadingWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 40px;
  padding: 9px 12px 5px 12px;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50px;
  border-radius: 5px;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
  height: 500px;
  padding: 100px;
  align-items: start;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.nuetral.bgGrey};
  border-radius: 12px;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    padding: 30px;
    justify-content: start;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 390px;
  height: 76%;
  @media screen and (max-width: 1200px) {
    height: 250px;
    width: 250px;
  }
`;