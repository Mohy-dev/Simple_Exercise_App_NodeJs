const Exercise = require("../models/exerciseModel");

const exercisesAvailable = Exercise.schema.path("exerciseName").enumValues;

const isValidExerciseName = (value) => {
  return exercisesAvailable.includes(value);
};

module.exports = isValidExerciseName;
