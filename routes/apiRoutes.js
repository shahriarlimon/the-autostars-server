const express = require('express');
const app = express();
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes")
const errorMiddleware = require("../middlewares/error")
/* imported routes */
app.use("/cars", productRoutes)
app.use("/user", userRoutes)
app.use(errorMiddleware)
module.exports = app;