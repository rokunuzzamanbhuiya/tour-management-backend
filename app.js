const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.json());

//routes
const toursRoute = require("./routes/v1/tours.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to database
app.use("/api/v1/tours", toursRoute);

module.exports = app;
