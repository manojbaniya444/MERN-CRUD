const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

//  Wrokout routes
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();
const PORT = process.env.PORT;

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
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
