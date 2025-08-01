const express = require("express");
const router = express.Router();
const { verifyFirebaseToken } = require("../controllers/auth.controllers");

router.post("/firebase", verifyFirebaseToken); // POST /api/auth/firebase

module.exports = router;
