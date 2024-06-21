const express = require("express");
const app = express();
const connectWithDB = require("./config/dbConnect");
const router = require("./routes/route");
const cors = require("cors");

const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));
require("dotenv").config();

app.use(express.json());
connectWithDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("<h1> Backend</h1>");
});
app.use("/api/v1", router);
