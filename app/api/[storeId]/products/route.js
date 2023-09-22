// import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/libs/mongoose";

export async function POST(
  req,
  { params }
) {
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

    console.log(productCustomisation);

    // Add your validation logic here

    await mongooseConnect();
    const product = await Product.create({
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
    return new Response(JSON.stringify({product}));
    // return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new Response({error:"Internal error"}, { status: 500 });
  }
}