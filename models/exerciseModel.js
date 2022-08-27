const mongoose = require("mongoose");

let availableExercises = [
  "Pushups",
  "Pullups",
  "Squats",
  "LegLifts",
  "Planks",
  "JumpingJacks",
  "Cycling",
  "Walking",
  "Swimming",
  "StairClimbing",
  "Rowing",
  "Stretching",
  "Yoga",
  "Other",
];

const exerciseSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User", // Bind to the user (relation)
    // },
    exerciseName: {
      type: String,
      required: true,
      trim: true,
      enum: availableExercises,
      message:
        "Exercise name must be one of the following: Pushups, Pullups, Squats, LegLifts, Planks, JumpingJacks, Cycling, Walking, Swimming, StairClimbing, Rowing, Stretching, Yoga, Other",
    },
    hours: {
      type: Number,
      required: true,
    },
    mins: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
