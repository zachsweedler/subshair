import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PropertyGrid from "./PropertyGrid";
export const revalidate = 0;

export default async function PropertyGridServer() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: fetchedData,
    error: fetchError,
    count
  } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("created_by", session?.user?.id)
    .order("created_at", { ascending: false });
  if (fetchError) {
    setLoading(false);
    console.log("Error fetching properties:", fetchError);
  } else {
    console.log("fetched user props", fetchedData)
  }

  return <PropertyGrid data={fetchedData} count={count} />;
}
