const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: {
    type: String,
    enum: ["article", "thread", "technical"],
    required: true,
  },
  source: { type: String }, // e.g., CryptoDaily
  author: { type: String },
  tags: [String],
  link: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, default: 0 },
  voters: [String], // List of user IDs, IPs, or hashed device/session tokens
  views: { type: Number, default: 0 },
  readTime: { type: String }, // optional: "8 min"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema);
