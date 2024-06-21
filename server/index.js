const express = require("express");
const app = express();
const connectWithDB = require("./config/dbConnect");
const router = require("./routes/route");
const cors = require("cors");

const allowedOrigins = ['http://localhost:1358', 'https://notes-app-mern-9d8p.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
