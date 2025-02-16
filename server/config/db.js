const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blogdb";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB at ${MONGO_URI}`))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

module.exports = db;


