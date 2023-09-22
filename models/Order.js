import { model, Schema, models } from "mongoose";

const CustomerInfoSchema = new Schema({
  // Define the fields for customer data here (e.g., name, email, address).
  name: String,
  email: String,
  address: String,
  // Add other customer data fields as needed.
});

const OrderItemSchema = new Schema({
  // Define the fields for each order item here (e.g., productName, quantity, price).
  productName: String,
  quantity: Number,
  price: Number,
  // Add other order item fields as needed.
});

const ShippingInfoSchema = new Schema({
  // Define the fields for shipping details here (e.g., shippingMethod, address).
  shippingMethod: String,
  address: String,
  // Add other shipping detail fields as needed.
});

const PaymentInfoSchema = new Schema({
  // Define the fields for payment details here (e.g., paymentMethod, transactionId).
  paymentMethod: String,
  transactionId: String,
  // Add other payment detail fields as needed.
});

const OrderSchema = new Schema({
  customerInfo: CustomerInfoSchema,
  orderStatus: String,
  orderItems: [OrderItemSchema],
  orderValue: Number,
  shippingInfo: ShippingInfoSchema,
  orderNotes: String,
  paymentInfo: PaymentInfoSchema,
  isPaid: Boolean,
}, {
  timestamps: true,
});

export const Order = models.Order || model('Order', OrderSchema);
