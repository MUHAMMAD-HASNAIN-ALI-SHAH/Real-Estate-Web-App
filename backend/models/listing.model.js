const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Beach", "Cabin", "Apartment", "Luxury"], // optional validation
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    image: {
      type: String, // base64 encoded image
      required: true,
    },
    image1: {
      type: String, // base64 encoded image
      required: true,
    },
    image2: {
      type: String, // base64 encoded image
      required: true,
    },
    image3: {
      type: String, // base64 encoded image
      required: true,
    },
    image4: {
      type: String, // base64 encoded image
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
