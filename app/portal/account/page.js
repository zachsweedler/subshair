import AccountInfoForm from '@/components/portal/AccountInfoForm'
import { Flex } from '@/components/common/Flexboxes'
import React from 'react'
import PageNav from "@/components/portal/page-nav/PageNav";
import Avatar from '@/components/avatar/Avatar';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
export const revalidate = 0

export const metadata = {
  title: "My Account | SubShair",
};

export default async function Account() {

  const supabase = createServerComponentClient({ cookies })
  const {data: {user}} = await supabase.auth.getUser();
  const {data: profile} = await supabase.from('profiles').select().eq("id", user.id)

  return (
    <>
      <PageNav title="Account" top/>
          <Flex direction='column' rowGap='60px' width="100%" align='center'>
              <Avatar withInfo withEdit bigBool={true} profile={profile[0]} userEmail={user.email}/>
              <AccountInfoForm profile={profile[0]} userEmail={user.email}/>
          </Flex>
    </>
  )
}


