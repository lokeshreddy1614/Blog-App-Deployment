const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("hello");
});


app.get("/", (req, res) => {
  res.send("Server is running...");
});


app.listen(5001, "0.0.0.0", () => {
  console.log("Server running on port 5001");
});

