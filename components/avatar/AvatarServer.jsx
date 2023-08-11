import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Avatar from "./Avatar";
export const revalidate = 0;

export default async function AvatarServer() {
  const supabase = createServerComponentClient({ cookies });


    const { data: {session}, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.log("Error fetching session", sessionError);
    } 

    const {data, error: profileError} = await supabase.from('profiles').select().eq("id", session.user.id)

    if (profileError) {
      console.log("Error fetching profile", profileError);
    } 

  return <Avatar profile={data[0]}/>
}