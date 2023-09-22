import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { SettingsForm } from "./components/settings-form";
import { mongooseConnect } from "@/libs/mongoose";
import { Store } from "@/models/Store";

const SettingsPage = async ({
  params
}: {
  params: { storeId: string }
  }) => {
  try {
    const { userId } = auth();
    await mongooseConnect();
    if (!/^[0-9a-fA-F]{24}$/.test(params.storeId)) {
      throw new Error("Invalid store ID");
    
    }
    const store = await Store.findOne({ userId, _id: params.storeId });
    if (!store) {
      redirect('/');
    }

    // Convert the store object to a plain JavaScript object and remove non-serializable properties
    const sanitizedStore = {
      storeName: store.storeName,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
      storeId: params.storeId,
    };

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SettingsForm initialData={sanitizedStore} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('[SETTINGS_PAGE]', error);

    // Redirect to the root page ("/") if there's an error
    return redirect('/');
  }
}

export default SettingsPage;
