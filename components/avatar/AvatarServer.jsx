import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Avatar from "./Avatar";
export const revalidate = 0;

export default async function AvatarServer() {

    const supabase = createServerComponentClient({ cookies });

    const {data: {user}} = await supabase.auth.getUser();
    const {data: profile} = await supabase.from('profiles').select().eq("id", user.id)

  return <Avatar profile={profile[0]} userEmail={user.email}/>
}