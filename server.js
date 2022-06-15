const path = require("path"); //setting up static files for the production server

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

const connectDB = require("./config/db");

//bring in the .env file
dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //to use the body parser in the controller

app.use("/api/v1/transactions", transactions);

//prepare for production [FINAL STAGE ONCE DEVELOPMENT IS COMPLETED]
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get(
    "*",
    (
      req,
      res //any root apart from api url, hence *
    ) => res.sendFile(path.resolve(__dirname + "client", "build", "index.html")) //loads index.html file
  );
}

app.get("/", (req, res) => res.send("Hello"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
