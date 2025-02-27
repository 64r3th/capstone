// server/server.js

const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/:data", (req, res) => {
  fs.readFile(path.resolve(__dirname, `./data/${req.params.data}.json`), "utf8", (err, data) => {
    if (err) {
      res.json({ message: `Error reading file -${err}-` });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} | http://localhost:${PORT}`);
});