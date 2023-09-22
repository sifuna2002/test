import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import AdminNav from "@/components/AdminNav"

export default async function SetupLayout({
  children,
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  return (
    <>
      <AdminNav/>
      {children}
    </>
  );
}
