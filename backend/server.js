require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const pupilRoutes = require("./routes/pupils");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// Configure CORS to allow your frontend origin
const corsOptions = {
  origin: "https://driving-instructor-app-1.onrender.com", // Frontend URL on Render
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and credentials if needed
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse JSON and log requests
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/pupils", pupilRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
