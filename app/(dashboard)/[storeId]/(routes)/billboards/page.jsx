import { format } from "date-fns";
import { mongooseConnect } from "@/libs/mongoose";
import { BillboardsForm } from "./components/billboards-form";
import { Billboard } from "@/models/Billboard"; // Adjust the import path and model name

const BillboardsPage = async ({ params }) => {
  const { storeId } = params;

  await mongooseConnect();

  try {
    // Fetch billboards with a matching storeId
    const billboards = await Billboard.find({ storeId });


    const formattedBillboards = billboards?.map((billboard) => ({
      id: billboard._id,
      label: billboard.billboardText,
      createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
    }));
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardsForm data={formattedBillboards} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching billboards:", error);
    return <div>Error fetching billboards</div>;
  }
}

export default BillboardsPage;