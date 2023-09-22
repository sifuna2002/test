"use client"

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";

export const BillboardsForm = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6 pl-4">
        <div className="flex justify-between">
          <Heading title={`Billboards : (${data.length})`} description="Manage billboards for your store" />
          <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
      </div>
    </>
  );
};
