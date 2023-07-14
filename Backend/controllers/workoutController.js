const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 }); // descending on date (new on top)
  res.status(200).json(workouts);
};

// get a single workout
const getSingleWorkout = async (req, res) => {
  const id = req.params.id;

  // If id not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "invalid object id of mongodb collection" });
  }

  // finding the workout from the database
  const singleWorkout = await Workout.findById(id);

  // If not found in the database
  if (!singleWorkout) {
    return res.status(404).json({ error: "Not found in the database" });
  }
  res.status(200).json(singleWorkout);
};

// create a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    // Creating new workout using mongoose schema
    const newWorkout = await Workout.create({ title, load, reps });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // checking if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "invalid object id of mongodb collection" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "Workout not found on database." });
  }

  res.status(200).json(workout);
};

// update a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "invalid object id of mongodb collection" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    //data to be updated
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No workout found." });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
