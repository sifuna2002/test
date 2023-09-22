"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order No.",
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
  },
  {
    accessorKey: "orderValue",
    header: "Order Value (USD)",
  },
  {
    accessorKey: "shipingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerPhone",
    header: "Customer Phone",
  },
  
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
