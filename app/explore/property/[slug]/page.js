import DetailPage from "@/components/property-detail-page/DetailPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import FixedCat from "@/components/property-detail-page/FixedCat";

async function ViewProperty({ params }) {

  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("properties")
    .select('*')
    .eq("id", params?.slug);
  console.log('property data', data)

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data && data[0]?.created_by)
  console.log('profile data', profileData)

  const {data: {session}} = await supabase.auth.getSession()

  return (
    <>
    {data && (
      <>
        <head>
          <title>{data && data[0] && `${data[0].property_full_address} | SubShair`}</title>
        </head>
        <FixedCat session={session} propData={data[0]} landlordData={profileData[0]}/>
        <DetailPage propData={data[0]} landlordData={profileData[0]} session={session}/>
      </>
    )}
    </>
  );
}

export default ViewProperty;
