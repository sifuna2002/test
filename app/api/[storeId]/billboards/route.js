import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { Billboard } from "@/models/Billboard"; // Check the correct path and model name
import { mongooseConnect } from "@/libs/mongoose";

export async function POST(
  req,
  { params }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      billboardText,
      billboardCategory,
      billboardImage,
      storeId
    } = body;


    // Add your validation logic here

    // Ensure that the database connection is established before creating the document
    await mongooseConnect();

    // Create a Billboard document
    const billboard = await Billboard.create({
      billboardText,
      billboardCategory,
      billboardImage,
      storeId
    });

    return NextResponse.json(billboard, { status: 201 });

  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

