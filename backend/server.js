const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ImageSchema = new mongoose.Schema({
  title: String,
  url: String,
  price: Number,
});
const Image = mongoose.model("Image", ImageSchema);

const PurchaseSchema = new mongoose.Schema({
  imageId: String,
  paymentId: String,
  userEmail: String,
});
const Purchase = mongoose.model("Purchase", PurchaseSchema);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Make sure to store key in .env file
  key_secret: process.env.RAZORPAY_SECRET, // Make sure to store key in .env file
});

// Get images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find(); // Fetch from MongoDB
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get image by ID
app.get("/api/images/:id", async (req, res) => {
  res.json(await Image.findById(req.params.id));
});

// Initiate Razorpay Payment
app.post("/api/payment", async (req, res) => {
  const { amount } = req.body;
  console.log("Received amount:", amount); // Log to check if amount is correct
  try {
    const payment = await razorpay.orders.create({
      amount: amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });
    res.json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment initiation failed" });
  }
});

// Handle Payment Success
app.post("/api/payment/success", async (req, res) => {
  const { paymentId, imageId, userEmail } = req.body;
  try {
    await Purchase.create({ imageId, paymentId, userEmail });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Purchase creation failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
