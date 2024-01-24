// const mongoose = require('mongoose');
// const dotenv = require("dotenv")
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI as string;
mongoose
  .connect(URI, {})

  .then(() => {
    console.log("database is connected");
  })
  .catch(() => {
    console.log("not connected to database");
  });
