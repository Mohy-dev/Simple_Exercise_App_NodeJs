const express = require("express");
const app = express(); // create an instance of express
const colors = require("colors"); //colors for console
const morgan = require("morgan"); //logging middleware
const cors = require("cors"); // To allow cross-origin requests between frontend and backend
require("dotenv").config(); // To use .env file

const connectDB = require("./config/db"); // To connect to the database
const exerciseRoutes = require("./routes/exerciseRoute"); // To use the exercise routes
const userRoutes = require("./routes/userRoute"); // To use the user routes
const errorHandler = require("./middleware/errorMiddleware"); // To handle errors

const port = process.env.PORT || 5000;
connectDB();
app.use(
  cors({
    methods: process.env.CORS_METHODS, // To allow only these methods
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/exercise", exerciseRoutes);
app.use("/api/users", userRoutes);
app.get("/api", (req, res) => res.send("Hit and run!"));

app.use(errorHandler);
app.listen(port, () =>
  console.log(`Exercise App listening on port ${port}!`.yellow.inverse.bold)
);
