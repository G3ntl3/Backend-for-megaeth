const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_URI
const PORT= process.env.PORT

const authRoutes = require("./routes/auth.route");
const contentRoutes = require("./routes/content.route");
 


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

// DB Connection + Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));


