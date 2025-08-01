const express = require("express");
const router = express.Router();
const { verifyFirebaseToken } = require("../controllers/auth.controllers");
// POST /api/auth/firebase
router.post("/firebase", verifyFirebaseToken); 

module.exports = router;
