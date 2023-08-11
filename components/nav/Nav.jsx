import NavClient from "./NavClient";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import AvatarServer from "../avatar/AvatarServer";
export const revalidate = 0;

export default async function Nav () {

    const supabase = createServerComponentClient( { cookies })
    const {data: {session}} = await supabase.auth.getSession()
    
    return (
        <NavClient session={session}>
            <AvatarServer/>
        </NavClient>
    )
}