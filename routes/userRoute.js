const express = require("express");
const router = express.Router();
const requestsLimiter = require("../utils/requestsLimiter");
const createUser = require("../controllers/userController");

router.route("/").post(requestsLimiter, createUser);

module.exports = router;
