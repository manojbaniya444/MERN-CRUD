const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

// Get all the workouts
router.get("/", getAllWorkouts);

// Get a single workout
router.get("/:id", getSingleWorkout);

// Post a workout
router.post("/", createWorkout);

// Delete an existing workout

router.delete("/:id", deleteWorkout);

// Update a workout

router.patch("/:id", updateWorkout);

module.exports = router;
