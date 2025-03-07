const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "History" },
  { id: 2, name: "Math" },
  { id: 3, name: "English" },
  { id: 4, name: "Science" },
];

router.get("/", (req, res) => {
  res.json(courses);
});

module.exports = router;
