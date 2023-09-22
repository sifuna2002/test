import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { Store } from "@/models/Store";
import { mongooseConnect } from "@/libs/mongoose";

import Navbar from '@/components/navbar'
import AdminNav from '@/components/AdminNav';
import DashBoardNav from '@/components/DashBoardNav';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  return (
    <>
      <DashBoardNav />
      {children}
    </>
  );
};
