require("dotenv").config({});
const mongoose = require("mongoose");

const purgeDB = async () => {
  try {
    const db = mongoose.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();

    // Create an array of collection names and drop each collection
    const rmArr = collections
      .map((collection) => collection.name)
      .map((collectionName) => db.dropCollection(collectionName));

    await Promise.allSettled(rmArr);

    console.log(
      `DB purged! Refresh connection with MongoDB from server by restarting.`
    );
  } catch (err) {
    console.log(`Error while purging: `);
    console.log(err);
  } finally {
    process.exit(1);
  }
};

mongoose.connect(process.env.MONGO_URI).finally(() => {
  purgeDB();
});
