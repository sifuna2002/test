import { Product } from "@/models/Product";
import { ProductForm } from "./components/product-form";
import { auth } from "@clerk/nextjs";
import { mongooseConnect } from "@/libs/mongoose";

const ProductPage = async ({ params }) => {
  await mongooseConnect();

  if (params.productId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm />
        </div>
      </div>
    );
  } else {
    // Handle the case when editing an existing product
    const product = await Product.findOne({
      _id: params.productId,
      storeId: params.storeId
      // Add any other query conditions here if needed
    });

    if (!product) {
      return (
        <div className="justify-center items-center px-20 pt-10">
          Product not found
        </div>
      );
    }

    // Convert the Mongoose model instance to a plain object
    const productData = product.toObject();

    console.log("This Is the Product:", { productData });

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm initialData={productData} />
        </div>
      </div>
    );
  }
};

export default ProductPage;
