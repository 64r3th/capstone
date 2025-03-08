const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const router = require("./middleware/router");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} | http://localhost:${PORT}`);
});
