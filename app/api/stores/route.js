import {Store} from "@/models/Store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/libs/mongoose";

         
export async function POST(request) {
    const { userId } = auth();
    const { storeName } = await request.json();
    try {
        await mongooseConnect();
        const stores = await Store.create({ storeName, userId});
        return NextResponse.json(stores, { status: 201 });
    } catch (err) {
        console.log(err);
   }

}

export async function GET(request) {
    const { userId } = auth();
    await mongooseConnect();
    const store = await Store.find({ userId });
    return NextResponse.json(store);

}

export async function DELETE(request) {
        await mongooseConnect();
        const store = await Prospect.deleteOne({_id: storeId});
        return NextResponse.json({ message :"Store Deleted Succesfully"}, {status: 201});

}