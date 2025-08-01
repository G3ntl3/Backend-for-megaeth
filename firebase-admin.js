const admin = require("firebase-admin");
const serviceAccount = require("./firebase/megaethweb3-firebase-adminsdk-fbsvc-3972e6a7dc.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
