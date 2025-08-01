const Content = require("../models/content.model");

//    Create New Content
const createContent = async (req, res) => {
  try {
    const newContent = new Content({
      ...req.body,
      creator: req.userId, // From verifyFirebaseToken
    });

    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create content", error: err.message });
  }
};

//    Get All Content
const getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 });
    res.status(200).json(content);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch content", error: err.message });
  }
};

//    Get a Single Content by ID
const getSingleContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    content.views += 1; // Increment views
    await content.save();

    res.status(200).json(content);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch content", error: err.message });
  }
};

//    Rate (Upvote) Content
const rateContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    const voterId = req.userId || req.ip; // Firebase user or IP fallback

    if (content.voters.includes(voterId)) {
      return res.status(400).json({ message: "You’ve already voted" });
    }

    content.rating += 1;
    content.voters.push(voterId);
    await content.save();

    res
      .status(200)
      .json({ message: "Thank you for rating", rating: content.rating });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to rate content", error: err.message });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getSingleContent,
  rateContent,
};
