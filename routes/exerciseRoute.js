const express = require("express");
const router = express.Router();
const requestsLimiter = require("../utils/requestsLimiter");
const {
  createExerciseEntry,
  getAllExercisesDays,
  getHighestMonthCount,
} = require("../controllers/exerciseController");

router
  .route("/")
  .post(requestsLimiter, createExerciseEntry)
  .get(getAllExercisesDays);

router.route("/highest_month").get(getHighestMonthCount);

module.exports = router;
