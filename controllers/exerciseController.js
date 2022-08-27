const asyncHandler = require("express-async-handler");
const Exercise = require("../models/exerciseModel");
const isValidExerciseName = require("../utils/controllerFunctions");

/**
 * @desc Create a new exercise entry
 * @route POST /api/exercise
 * @access Public
 **/
const createExerciseEntry = asyncHandler(async (req, res) => {
  const { exerciseName, hours, mins } = req.body; // add useId and it's id, if we create it by user
  if (!exerciseName || !hours || !mins) {
    res.status(400);
    throw new Error("Missing required fields");
  }
  if (
    isValidExerciseName(exerciseName) &&
    !isNaN(hours) &&
    !isNaN(mins) &&
    mins > 0
  ) {
    const newExercise = await Exercise.create({
      exerciseName,
      hours,
      mins,
    });
    if (newExercise) {
      res.status(201).json({
        success: true,
        data: newExercise,
      });
    }
  } else {
    res.status(400);
    throw new Error("Invalid exercise name or Invalid time inputs");
  }
});

/**
 * @desc Get all days count of the exercises entries in this current month
 * @route GET /api/exercise
 * @access Public
 **/
const getAllExercisesDays = async (req, res) => {
  const allExercises = await Exercise.find();
  if (allExercises) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthExercises = allExercises.filter(
      (exercise) =>
        exercise.createdAt.getMonth() === currentMonth &&
        exercise.createdAt.getFullYear() === currentYear
      // exercise.userId === req.body.userId // we can compare by userId, if we need to filter to specific user
    );
    res.status(200).json({
      success: true,
      count: currentMonthExercises.length,
      data: currentMonthExercises, // it is a plus, it should be removed (testing)
    });
  }
};

/**
 * @desc Get the highest count of the exercises entries per month in this current year
 * @route GET /api/exercise/highest_month
 * @access Public
 **/
const getHighestMonthCount = async (req, res) => {
  const allExercises = await Exercise.find();
  if (allExercises) {
    const currentYear = new Date().getFullYear();
    const currentYearExercises = allExercises.filter(
      (exercise) => exercise.createdAt.getFullYear() === currentYear
      // exercise.userId === req.body.userId // we can compare by userId, if we need to filter to specific user
    );
    const highestMonthCount = currentYearExercises.reduce(
      (acc, curr) => {
        if (curr.createdAt.getMonth() > acc.month) {
          return { month: curr.createdAt.getMonth(), count: 1 };
        } else if (curr.createdAt.getMonth() === acc.month) {
          return { month: curr.createdAt.getMonth(), count: acc.count + 1 };
        } else {
          return acc;
        }
      },
      { month: 0, count: 0 }
    );
    res.status(200).json({
      success: true,
      data: {
        month: highestMonthCount.month + 1, // Highest month is 0-11, so we need to add 1 to it
        count: highestMonthCount.count, // this month entries count, it is a plus (testing)
      },
    });
  }
};

module.exports = {
  createExerciseEntry,
  getAllExercisesDays,
  getHighestMonthCount,
};
