import {Store} from "@/models/Store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/libs/mongoose";

export async function POST(request, params) {  
  const { userId } = auth();
  const { storeName } = await request.body.json();
  await mongooseConnect();
  const store = await Store.create({ storeName, userId });
  return NextResponse.redirect(`/store/${store._id}`);
}
export async function GET(request, params) {
    const { userId } = auth();
    await mongooseConnect();
    const store = await Store.findOne({ userId, _id : params.storeId });
    return NextResponse.json(store);

}

export async function DELETE(request, params) {
  const { storeId } = params;
  await mongooseConnect();
  const store = await Store.deleteOne({ _id: storeId });
  
  if (store.deletedCount === 0) {
    // If no store was deleted, you might return a 404 status code
    return NextResponse.json({ message: "Store not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Store Deleted Successfully" }, { status: 204 });
}