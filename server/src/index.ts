require("dotenv").config();

import mongoose from "mongoose";

import { app } from "./server";

const PORT = process.env.PORT || 400;
const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`);
  });
});
