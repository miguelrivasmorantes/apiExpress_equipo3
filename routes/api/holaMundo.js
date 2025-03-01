const express = require("express");
const router = express.Router();

router.get("/hola", (req, res) => {
  res.status(200).json({ message: "Hola Mundo" });
});

module.exports = router;
