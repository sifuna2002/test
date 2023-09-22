import { model, Schema, models } from "mongoose";

const BillboardSchema = new Schema({
  billboardText: String,
  billboardCategory: String,
  billboardImage: String,
  storeId: String,
}, {
  timestamps: true,
});

export const Billboard = models.Billboard || model('Billboard', BillboardSchema);
