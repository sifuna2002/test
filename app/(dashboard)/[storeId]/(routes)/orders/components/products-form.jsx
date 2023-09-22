"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";

export const ProductsForm = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6 pl-4">
        <div className="flex justify-between">
          <Heading title={`Orders : (${data.length})`} description="Manage Your Incoming Orders" />
          {/* <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button> */}
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </>
  );
};
