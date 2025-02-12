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

// Image Schema
const ImageSchema = new mongoose.Schema({
  title: String,
  url: String,
  price: Number,
});
const Image = mongoose.model("Image", ImageSchema);

// Purchase Schema (Fixed: imageId now references Image, added price)
const PurchaseSchema = new mongoose.Schema({
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  paymentId: String,
  userName: String,
  userEmail: String,
  userPhone: String,
  price: Number, // Storing the price at the time of purchase
  timestamp: { type: Date, default: Date.now },
});
const Purchase = mongoose.model("Purchase", PurchaseSchema);

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single image by ID
app.get("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Image not found" });
  }
});

// Get all purchases (Fixed: Properly populate image details)
app.get("/api/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("imageId"); // Populates image details
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching purchases" });
  }
});

// Initiate Razorpay Payment
app.post("/api/payment", async (req, res) => {
  const { amount } = req.body;
  console.log("Received amount:", amount); // Debugging log

  try {
    const payment = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
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

// Handle Payment Success (Fixed: Store price in purchase record)
app.post("/api/payment/success", async (req, res) => {
  const { paymentId, imageId, userName, userEmail, userPhone } = req.body;

  try {
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await Purchase.create({
      imageId,
      paymentId,
      userName,
      userEmail,
      userPhone,
      price: image.price, // Store the price at the time of purchase
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Purchase creation failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
