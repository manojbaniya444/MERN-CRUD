const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

// Get all the workouts
router.get("/", getAllWorkouts);

// Get a single workout
router.get("/:id", getSingleWorkout);

// Post a workout
router.post("/", createWorkout);

// Delete an existing workout

router.delete("/:id", (req, res) => {
  res.json({ res: "Delete workout by id" });
});

// Update a workout

router.patch("/:id", (req, res) => {
  res.json({ res: "Update a workout" });
});

module.exports = router;
