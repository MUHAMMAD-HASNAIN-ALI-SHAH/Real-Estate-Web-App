const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
