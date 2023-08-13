import PortalLayout from "@/components/portal/PortalLayout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export const revalidate = 0

export default async function ManageLayout({children}) {

  const supabase = createServerComponentClient({ cookies })

  const {data: {session}} = await supabase.auth.getSession()
  if (!session) {
      redirect('/sign-in')
  }
  return (
    <>
      <PortalLayout title="Title">
        {children}
      </PortalLayout>
    </>
  );
}
