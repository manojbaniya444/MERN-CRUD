const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//  Wrokout routes
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();
const PORT = 8080;

// Cross origin patse
app.use(cors());

// Parser middleware
app.use(express.json());

//Logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes for workouts middleware
app.use("/api/workouts", workoutRoutes);

// Connect to the database in mongoose
mongoose
  .connect(
    "mongodb+srv://manojbaniya444:Suf250000@merncrud.hdan4xs.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
