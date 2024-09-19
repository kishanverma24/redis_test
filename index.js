const express = require("express");
const { dbConnect } = require("./config/db.config");
const router = require("./routes/blogs.routes");
const app = express();
const port = 3000;

require("dotenv").config();
dbConnect();
app.use("/api", router);
app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
