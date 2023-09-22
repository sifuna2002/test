import {Store} from "@/models/Store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/libs/mongoose";


export async function PATCH(
   req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

      const { storeName } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!storeName) {
      return new NextResponse("Store Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    await mongooseConnect();
    const updatedStore = await Store.findOneAndUpdate(
      { _id: params.storeId, userId },
      { storeName: storeName },
      { new: true }
      );
      return NextResponse.json("Store Updated", { status: 201 });
    
    // Rest of your code...
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Delete the store in the MongoDB database
    await mongooseConnect();
    const deletedStore = await Store.deleteOne({
      _id: params.storeId,
      userId
    });

    if (deletedStore.deletedCount === 1) {
      // Store was successfully deleted
      return new NextResponse("Store deleted", { status: 200 });
    } else {
      // Store was not found or not deleted
      return new NextResponse("Make sure you removed all products and categories first.", { status: 400 });
    }

    // Rest of your code...

  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

