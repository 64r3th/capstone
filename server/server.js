// server/server.js

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./middleware/router");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan("dev"));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/courses", (res, req) => {
  res.sendfile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} | http://localhost:${PORT}`);
});
