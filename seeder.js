const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const users = require("./data/users");
const Exercise = require("./models/exerciseModel");
const exercises = require("./data/exercise");
const colors = require("colors");
const connectDB = require("./config/db.js");

require("dotenv").config();
connectDB();

const importData = async () => {
  console.log(exercises);
  try {
    await Exercise.deleteMany();
    // await User.deleteMany();
    // const createUsers = await User.insertMany(users);
    // const user = createUsers[0]._id;
    // const sampleExercises = Exercise.map((product) => {
    //   return { ...Exercise, user: user };
    // });
    // await Exercise.insertMany(sampleExercises);
    await Exercise.insertMany(exercises); // we only import only the exercises
    console.log("Data Imported".green.inverse.bold);
  } catch (error) {
    console.log(`${error}`.red.underline);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all data in the collections
    await Exercise.deleteMany();
    await User.deleteMany();
    console.log(`Data Destroyed !`.red.inverse);
  } catch (error) {
    console.log(`${error}`.red.underline);
    process.exit(1);
  }
};

//"node seeder" to import data
//"node seeder -d" to destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
