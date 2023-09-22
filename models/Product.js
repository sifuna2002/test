import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  images: [
    {
      url: String,
    }
  ],
  productName: String,
  productDescription: String,
  cashPrice: Number,
  sellingPrice: Number,
  percentageDiscount: Number,
  productCategory: String,
  productOcassion: String,
  productColor: String,
  productHeight: Number,
  productWidth: Number,
  productWeight: Number,
  productFunctionality: String,
  productTexture: String,
  productMaterial: String,
  productPlacement: String,
  productAvailability: String,
  productOrigin: String,
  productCustomisation: String,
  suitableRoom: String,
  productSymbolism: String,
  productAgeGroup: String,
  productGender: String,
  handlingTime: Number,
  storeId: String,
  isFeatured: Boolean,
  isArchived: Boolean,
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);
