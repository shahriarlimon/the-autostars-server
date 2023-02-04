const express = require('express');
const app = express();
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes")
/* imported routes */
app.use("/cars", productRoutes)
app.use("/user", userRoutes)
module.exports = app;