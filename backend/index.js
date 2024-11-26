const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send(`App is listening at ${PORT}`);
});

const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
