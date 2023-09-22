import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { Product } from "@/models/Product";
import { mongooseConnect } from "@/libs/mongoose";



export async function DELETE(
  req,
  { params }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    await mongooseConnect();

    // Use Mongoose to find and delete the store
    const result = await Product.deleteOne({
      _id: params.productId,
      storeId: params.storeId,
    });

    if (result.deletedCount === 0) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse("Product deleted successfully", { status: 200 });

  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      cashPrice,
      handlingTime,
      images,
      isArchived,
      isFeatured,
      percentageDiscount,
      productAgeGroup,
      productAvailability,
      productCategory,
      productColor,
      productCustomisation,
      productDescription,
      productFunctionality,
      productGender,
      productHeight,
      productMaterial,
      productName,
      productOcassion,
      productOrigin,
      productPlacement,
      productSymbolism,
      productTexture,
      productWeight,
      productWidth,
      sellingPrice,
      shippingOption,
      suitableRoom,
      storeId
    } = body;


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId || !params.storeId) {
      return new NextResponse("Product id and store id are required", { status: 400 });
    }


    await mongooseConnect();
    const updatedProduct = await Product.updateOne(
      {
        _id: params.productId,
        storeId: params.storeId,
      },
      {
      cashPrice,
      handlingTime,
      images,
      isArchived,
      isFeatured,
      percentageDiscount,
      productAgeGroup,
      productAvailability,
      productCategory,
      productColor,
      productCustomisation,
      productDescription,
      productFunctionality,
      productGender,
      productHeight,
      productMaterial,
      productName,
      productOcassion,
      productOrigin,
      productPlacement,
      productSymbolism,
      productTexture,
      productWeight,
      productWidth,
      sellingPrice,
      storeId,
      suitableRoom,
      });
    
    if (!updatedProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse(updatedProduct, { status: 200 });
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}