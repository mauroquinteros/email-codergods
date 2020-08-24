const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    app: "Coder Gods",
  });
});

router.post("/users", (req, res) => {
  const data = req.body;
  res.json({
    data,
    date: new Date(),
  });
});

module.exports = router;
