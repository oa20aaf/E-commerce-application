const express = require("express");
const app = express();
const dotenv = require("dotenv");
const products = require("./data/Products");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");

//connect db
mongoose
  .connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("db connected"))
  .then((err) => {
    err;
  });

// api product test route
//app.get("/api/products", (req, res) => {
//   res.json("products");
//});
//app.get("/api/products/:id", (req, res) => {
//   const product = products.find((product)=>product.id == req.params.id)
// res.json(product);
//});
app.get("/", function (req, res) {
  res.setHeader("access-control-allow-Origin", "*");
  res.setHeader(
    "access-control-allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "access-control-allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("access-control-allow-Credentials", true);
  res.send("cors problem fixed:)");
});

const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");
const contactRoute = require("./routes/Contact");
//database seeder routes
app.use("/api/seed", databaseSeeder);
app.use(express.json());
app.use(cors());
//Users routes
//api/users/login
app.use("/api/users", userRoute);

// Contact routes
app.use("/api/contact", contactRoute);

//Products routes
app.use("/api/products", productRoute);

//Orders routes
app.use("/api/Orders", orderRoute);

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);

});



