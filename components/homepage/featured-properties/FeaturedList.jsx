import { supabaseClient } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FeaturedCard from "../FeaturedCard";

function FeaturedList() {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchFeaturedProps = async () => {
      const { data, error } = await supabaseClient
        .from("properties")
        .select("*")
        .in('id', ['b7aa8e5b-4d26-4f4a-9eb1-ab7262c7501b'])
      if (error) {
        console.log("error fetching featured properties", error);
      } else {
        setFetchedData(data); 
      }
    };
    fetchFeaturedProps();
  }, []);

  useEffect(() => {
    console.log("fetched data", fetchedData && fetchedData);
  }, [fetchedData]);

  return (
    <Wrapper>
      {fetchedData?.map((item) => (
        <FeaturedCard
          key={item.id}
          address={item.property_address}
          city={item.property_city}
          state={item.property_state}
          rent={item.property_rent}
          revShare={item.property_rev_share}
          images={item.property_images}
        />
      ))}
    </Wrapper>
  );
}

export default FeaturedList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px;
  align-self: stretch;
`;
