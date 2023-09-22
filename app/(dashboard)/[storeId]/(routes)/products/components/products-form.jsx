"use client"

import { ApiList } from "@/components/ui/api-list";
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
          <Heading title={`Products : (${data.length})`} description="Manage Your Products" />
          <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="API" description="API Calls for Products" />
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />

      </div>
    </>
  );
};
