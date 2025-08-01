const express = require("express");
const {
  createContent,
  getAllContent,
  getSingleContent,
  rateContent,
} = require("../controllers/content.controllers");

// const { verifyFirebaseToken } = require("../middlewares/auth.middleware");

const router = express.Router();
const verifyFirebaseToken = require("../middleware/auth.middleware"); //    Import middleware

// Public: Get all content (with filters)
router.get("/", getAllContent);

// Public: Get single content by ID
router.get("/:id", getSingleContent);

// Public: Rate content (add a star)
router.patch("/:id/rate", rateContent);

// Protected: Post content
router.post("/", verifyFirebaseToken, createContent);

router.get("/", async (req, res) => {
  try {
    const all = await Content.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

module.exports = router;
