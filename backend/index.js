const express = require("express");
require("dotenv").config();
const connectDB = require("./db/db");
const productRoutes = require("./routes/productRoute");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/products", productRoutes);



const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
