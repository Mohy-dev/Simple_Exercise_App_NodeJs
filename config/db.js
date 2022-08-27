const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Connect to MongoDB atlas 'cloud'
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (conn) {
      console.log(
        `MongoDB Connected Atlas: ${conn.connection.host}`.blue.underline.bold
      );
    } else {
      // Otherwise, connect locally, run "mongod" in terminal first
      const conn2 = await mongoose.connect(
        "mongodb://localhost:27017/Exercise_App",
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
        }
      );
      console.log(
        `MongoDB Connected Locally: ${conn2.connection.host}`.pink.underline
          .bold
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
