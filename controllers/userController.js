const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc Create a new user
 * @route POST /api/users
 * @access Public
 **/
const createUser = asyncHandler(async (req, res) => {
  const { userName } = req.body;
  if (!userName) {
    res.status(400);
    throw new Error("Missing required fields");
  }
  const newUser = await User.create({
    userName,
  });
  if (newUser) {
    res.status(201).json({
      success: true,
      data: newUser,
    });
  }
});

module.exports = createUser;
