const express = require("express");
const app = express();

app.use(express.json());

app.post("/callback", (req, res) => {
  console.log("Received callback:", req.body);
  // Acknowledge
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Callback catcher listening on port 3000");
});
