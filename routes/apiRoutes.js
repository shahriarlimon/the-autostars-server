const express = require('express');
const app = express();
const productRoutes = require("../routes/productRoutes")
/* imported routes */
app.use("/cars", productRoutes)
module.exports = app;