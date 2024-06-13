const mongoose = require("mongoose");
require("dotenv").config();
function connectWithDB(req, res) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1); 
    });
}
module.exports = connectWithDB;
