import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Avatar from "./Avatar";
export const revalidate = 0;

export default async function AvatarServer() {
  const supabase = createServerComponentClient({ cookies });


    const { data: {session}, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.log("Error fetching session", sessionError);
      return; 
    } 
    
    if(!session.user || !session.user.id) {
      console.log("User or user ID not available in session");
      return; 
    }

    const {data, error: profileError} = await supabase.from('profiles').select().eq("id", session?.user?.id)

    if (profileError) {
      console.log("Error fetching profile", profileError);
      return;
    } 

  return <Avatar profile={data[0]}/>
}