const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Data
const db = require("./db/db");

//Routes
const noteRoutes = require("./routes/notes");
const notebookRoutes = require("./routes/notebooks");
const tagRoutes = require("./routes/tags");

//Express instance
const app = express();

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/notebooks", notebookRoutes);
  app.use("/notes", noteRoutes);
  app.use("/tags", tagRoutes);

  app.use((req, res, next) => {
    const error = new Error("Path Not Found");
    error.status = 404;
    next(error);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(err.message || "Internal Server Error.");
  });

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
