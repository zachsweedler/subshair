"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../common/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearForm, updateProperty } from "@/slices/uploadSlice";
import { supabaseClient } from "@/utils/supabase";
import { Para } from "@/styles/StyledTypography";
import PropertyCard from "@/components/property-cards/PropertyCard";
import PageNav from "../page-nav/PageNav";
import Link from "next/link";

function PropertyGrid() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState()

  // load-more pagination states
  const [batch, setBatch] = useState(1);
  const [limit] = useState(8);
  const [totalProperties, setTotalProperties] = useState(0);

  // fetch user's properties
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      const {
        data: fetchedData,
        error: fetchError,
        count,
      } = await supabaseClient
        .from("properties")
        .select("*", { count: "exact" })
        .eq("created_by", session?.user?.id)
        .range(batch * limit - limit, batch * limit - 1)
        .order("created_at", { ascending: false });
      if (fetchError) {
        setLoading(false)
        console.log("Error fetching properties:", fetchError);
      } else {
        setTotalProperties(count);
        setLoading(false)
        if (batch === 1) {
          setProperties(fetchedData);
        } else {
          setProperties((prevProperties) => [
            ...prevProperties,
            ...fetchedData,
          ]);
        }
      }
    };
    fetchProperties();
  }, [batch, limit, totalProperties]);

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
          setTotalProperties((prevCount) => prevCount - 1);
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
                {properties.length === totalProperties ? (
                  <Para grey>No more properties to show</Para>
                ) : (
                  <Button hoverAnimate onClick={() => setBatch(batch + 1)}>Load More</Button>
                )}
              </Pagination>
            </Wrapper>
          ) : (
            <>
              <Para>
                Are you a landlord and are interested in SubShairing your
                property?
              </Para>
              <Button hoverAnimate>Creating Listing +</Button>
            </>
          )}
        </>
      ) : (
        <Para>Loading...</Para>
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
