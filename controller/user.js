const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwt = require('jsonwebtoken');


exports.login = catchAsyncErrors(async (req, res, next) => {
    const email = req.body;
    const token = jwt.sign(email, process.env.ACCESS_SECRET_TOKEN);
    res.json({
        success: true,
        token
    })
})