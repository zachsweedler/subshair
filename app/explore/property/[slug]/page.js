import DetailPage from "@/components/property-detail-page/DetailPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import FixedCat from "@/components/property-detail-page/FixedCat";
import { notFound } from "next/navigation";

async function ViewProperty({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params?.slug);

  if (!data || data.length === 0) {
    notFound();
  }

  const property = data[0];

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", property.created_by);

  if (!profileData || profileData.length === 0) {
    notFound();
  }

  const landlordData = profileData[0];

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <head>
        <title>{`${property.property_full_address} | SubShair`}</title>
      </head>
      <FixedCat
        session={session}
        propData={property}
        landlordData={landlordData}
      />
      <DetailPage
        propData={property}
        landlordData={landlordData}
        session={session}
      />
    </>
  );
}

export default ViewProperty;
