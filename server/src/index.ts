require("dotenv").config();

import mongoose from "mongoose";

import { app } from "./server";
import bcrypt from "bcrypt";
import Story from "./models/Story";
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI, {}).then(async () => {
  console.log("MongoDB connected!");

  app.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`);
  });
});
