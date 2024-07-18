require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const pupilRoutes = require("./routes/pupils");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// app.get("/", (req, res) => {
//   res.json({ mssg: "Welcome to the app" });
// });

app.use("/api/pupils", pupilRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
