const admin = require("../firebase/firebase");
const User = require("../models/user.model");

const verifyFirebaseToken = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken)
      return res.status(400).json({ message: "No ID token provided" });

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, name, email, picture } = decodedToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = new User({
        firebaseUid: uid,
        name: name || "Unknown",
        email: email || "",
        profilePic: picture || "",
      });
      await user.save();
    }

    res.status(200).json({
      message: "User verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
        ethosScore: user.ethosScore,
      },
    });
  } catch (error) {
    console.error("Firebase auth error:", error.message);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = { verifyFirebaseToken };
