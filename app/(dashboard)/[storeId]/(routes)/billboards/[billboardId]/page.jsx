import { Billboard } from "@/models/Billboard";
import { BillboardForm } from "./components/billboard-form";
import { auth } from "@clerk/nextjs";
import { mongooseConnect } from "@/libs/mongoose";

const BillboardPage = async ({ params }) => {
  await mongooseConnect();

  if (params.billboardId === "new") {
    // Handle the case when creating a new billboard


    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardForm />
        </div>
      </div>
    );
  } else {
    // Handle the case when editing an existing billboard
    const billboard = await Billboard.findOne({
      _id: params.billboardId,
      storeId: params.storeId,
    });

    if (!billboard) {
      return (
        <div className="justify-center items-center px-20 pt-10">
          Billboard not found
        </div>
      );
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardForm initialData={billboard} />
        </div>
      </div>
    );
  }
};

export default BillboardPage;
