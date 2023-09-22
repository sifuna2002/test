import { format } from "date-fns";
import { auth } from "@clerk/nextjs";
import { ProductsForm } from "./components/products-form";
import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";

const ProductsPage = async ({ params }) => {
  try {
    const { storeId } = params;
    await mongooseConnect();
    const products = await Product.find({storeId});

    const formattedProducts = products?.map((product) => ({
      id: product._id,
      name: product.productName,
      price: product.sellingPrice,
      category: product.productCategory,
      color: product.productColor,
      handlingTime: product.handlingTime,
      isArchived: product.isArchived,
      isFeatured: product.isFeatured,
      createdAt: format(product.createdAt, 'MMMM do, yyyy'),
    }));
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductsForm data={formattedProducts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }
}

export default ProductsPage;
