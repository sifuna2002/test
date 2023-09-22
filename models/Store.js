import  {model, Schema, models} from "mongoose";

const StoreSchema = new Schema({
  storeName: String,
  userId: String,
}, {
  timestamps: true,
});

export const Store = models.Store || model('Store', StoreSchema);