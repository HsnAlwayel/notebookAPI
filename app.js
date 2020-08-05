const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");

//Routes
const noteRoutes = require("./routes/notes");
const notebookRoutes = require("./routes/notebooks");

//Express instance
const app = express();

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("im a middleware method");
  next();
});

//Routers Use
app.use("/notebooks", notebookRoutes);
app.use("/notes", noteRoutes);

// No Path Found
app.use((req, res, next) => {
  res.status(404).json("Path not found");
});
//Error Handeling MiddleWare
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "internal Server Error",
  });
});

//localhost:8000
app.listen(8001, () => {
  console.log("The application is running on localhost:8000");
});
