import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let ordersConnection: mongoose.Connection | null = null;

const orderCouponSchema = new mongoose.Schema(
  {
    couponId: { type: mongoose.Schema.Types.ObjectId, default: null },
    code: { type: String, default: null },
    discountType: { type: String, default: null },
    discountValue: { type: Number, default: null },
    discountAmount: { type: Number, default: null },
  },
  { _id: false }
);

const deliveryAddressDetailSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    phone: { type: String, default: null },
    building: { type: String, default: null },
    street: { type: String, default: null },
    area: { type: String, default: null },
    pincode: { type: String, default: null },
    type: { type: String, default: "house" },
    label: { type: String, default: "Home" },
    instructions: { type: String, default: "" },
    _id: { type: String, default: null },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: String, default: null },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: null },
    items: { type: mongoose.Schema.Types.Mixed, required: true },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    slotCharge: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    deliveryType: { type: String, default: "delivery" },
    address: { type: String, required: true },
    deliveryArea: { type: String, required: true },
    deliveryAddressDetail: { type: deliveryAddressDetailSchema, default: null },
    pickupLocation: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: { type: String, default: "pending" },
    source: { type: String, default: "online" },
    subHubId: { type: String, default: null },
    subHubName: { type: String, default: null },
    superHubId: { type: String, default: null },
    superHubName: { type: String, default: null },
    couponIds: { type: [String], default: [] },
    couponCodes: { type: [String], default: [] },
    coupons: { type: mongoose.Schema.Types.Mixed, default: [] },
    paymentStatus: { type: String, default: "unpaid" },
    payments: { type: mongoose.Schema.Types.Mixed, default: [] },
    paidAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },
    paymentMode: { type: String, default: null },
    scheduleType: { type: String, default: null },
    deliveryDate: { type: String, default: null },
    timeslotId: { type: String, default: null },
    timeslotLabel: { type: String, default: null },
    timeslotStart: { type: String, default: null },
    timeslotEnd: { type: String, default: null },
    inventoryDeducted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    orderId: { type: String, default: null },
  },
  { versionKey: false }
);

const orderIdCounterSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export async function connectOrdersDb() {
  if (!ordersConnection) {
    ordersConnection = mongoose.createConnection(MONGODB_URI, { dbName: "orders" });
    ordersConnection.on("connected", () => console.log("Connected to orders DB"));
    ordersConnection.on("error", (err) => console.error("Orders DB error:", err));
    await ordersConnection.asPromise();
  }
  return ordersConnection;
}

export function getOrderModel() {
  if (!ordersConnection) {
    throw new Error("Orders DB not connected. Call connectOrdersDb() first.");
  }
  return ordersConnection.models["Order"] || ordersConnection.model("Order", orderSchema);
}

export function getOrderIdCounterModel() {
  if (!ordersConnection) {
    throw new Error("Orders DB not connected. Call connectOrdersDb() first.");
  }
  return (
    ordersConnection.models["OrderIdCounter"] ||
    ordersConnection.model("OrderIdCounter", orderIdCounterSchema, "order_id_counters")
  );
}

/**
 * Atomically increments the daily counter and returns the next orderId.
 * Uses the same `order_id_counters` collection as the admin POS panel.
 * Format: #FTS{YYYYMMDD}{N} — e.g. #FTS202605271
 */
export async function generateOrderId(): Promise<string> {
  // Always use IST (UTC+5:30) for the date key so orders placed after
  // midnight IST get the correct day's sequence number.
  const now = new Date();
  const istDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const date = istDate.toISOString().slice(0, 10).replace(/-/g, ""); // "YYYYMMDD"
  const Counter = getOrderIdCounterModel();
  const counter = await Counter.findOneAndUpdate(
    { date },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).lean() as any;
  return `#FTS${date}${counter.seq}`;
}
