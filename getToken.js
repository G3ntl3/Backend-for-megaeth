const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDwQWfj8AvSvM8-FnGCuDaPwi0fbVIaIaE",
  authDomain: "megaethweb3.firebaseapp.com",
  projectId: "megaethweb3",
  storageBucket: "megaethweb3.firebasestorage.app",
  messagingSenderId: "27625704443",
  appId: "1:27625704443:web:e94f4d74d1c5184927995e",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInWithEmailAndPassword(auth, "devgentle412@gmail.com", "Olawale2.")
  .then(async (userCredential) => {
    const user = userCredential.user;
    const token = await user.getIdToken();
    
    // console.log("Bearer " + token);
  })
  .catch((err) => {
    console.error(" Error signing in:", err.message);
  });
