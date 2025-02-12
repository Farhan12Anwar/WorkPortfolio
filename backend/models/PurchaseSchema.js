const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
  paymentId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);