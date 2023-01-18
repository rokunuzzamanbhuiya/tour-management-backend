const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 7000;

mongoose.set("strictQuery", true);

// database connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection is successful 🛢`.red.bold);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`.yellow.bold);
});

app.use(errorHandler);
