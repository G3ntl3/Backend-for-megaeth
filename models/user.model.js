const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // from Firebase
  name: { type: String },
  email: { type: String },
  profilePic: { type: String },
  role: { type: String, enum: ["creator", "admin"], default: "creator" },
  ethosScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
