import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Billboard } from "@/models/Billboard";
import { mongooseConnect } from "@/libs/mongoose";

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId || !params.storeId) {
      return new NextResponse("Billboard id and store id are required", { status: 400 });
    }

    // Assuming you have connected to MongoDB using mongooseConnect
    await mongooseConnect();

    // Use Mongoose to find and delete the store
    const result = await Billboard.deleteOne({
      _id: params.billboardId,
      storeId: params.storeId,
    });

    if (result.deletedCount === 0) {
      return new NextResponse("Store not found", { status: 404 });
    }

    return new NextResponse("Store deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId || !params.storeId) {
      return new NextResponse("Billboard id and store id are required", { status: 400 });
    }

    const body = await req.json();

    // Validate and extract the fields you want to update
    const {
      billboardText,
      billboardCategory,
      billboardImage,
    } = body;

    // Ensure that the database connection is established
    await mongooseConnect();

    // Find and update the billboard
    const updatedBillboard = await Billboard.findOneAndUpdate(
      {
        _id: params.billboardId,
        storeId: params.storeId,
      },
      {
        $set: {
          billboardText,
          billboardCategory,
          billboardImage,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedBillboard) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    return NextResponse.json(updatedBillboard, { status: 200 });
  } catch (error) {
    console.error("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}