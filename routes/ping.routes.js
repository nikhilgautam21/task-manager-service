const express = require("express");
const router = express.Router();

router.get("/", (_, res) =>
  res.status(200).json({ message: "Server is running " })
);

module.exports = router;
