const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Car = require("../model/product");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken")
exports.createCar = catchAsyncErrors(async (req, res, next) => {
    const car = await Car.create(req.body);
    const tokenInfo = req.headers.authorization;
    const [email, accessToken] = tokenInfo.split(" ");
    const decoded = verifyToken(accessToken);
    if (email === decoded.email) {
        res.json({
            success: true,
            car
        })

    } else {
        res.json({
            success: false,
            message: "unauthorize access"
        })
    }

})

exports.getCars = catchAsyncErrors(async (req, res, next) => {
    const cars = await Car.find({});
    res.json({
        success: true,
        cars
    })


})
exports.getSingleCar = catchAsyncErrors(async (req, res, next) => {
    let car = await Car.findById(req.params.id)
    if (!car) return next(new ErrorHandler("Car not found", 404));
    res.json({
        success: true,
        car
    })

})
exports.getUploadedCarsbyUser = catchAsyncErrors(async (req, res, next) => {
    const tokenInfo = req.headers.authorization;
    const [email, accessToken] = tokenInfo.split(" ");
    const decoded = verifyToken(accessToken);
    if (email === decoded.email) {
        const uploadedCars = await Car.find({ email})
        res.json({
            success: true,
            uploadedCars
        })
    } else {
        res.json({
            success: false
        })
    }
})
/* app.get('/uploadedCars', async (req, res) => {
    const tokenInfo = req.headers.authorization;
    const [email, accessToken] = tokenInfo.split(" ");
    const decoded = verifyToken(accessToken);
    if (email === decoded.email) {
      const uploadedCars = await uploadedCarsCollection.find({ email: email }).toArray();
      res.send(uploadedCars);
    } else {

    }
  }) */
exports.updateCar = catchAsyncErrors(async (req, res, next) => {
    let car = await Car.findById(req.params.id)
    if (!car) return next(new ErrorHandler("Car not found", 404));
    const tokenInfo = req.headers.authorization;
    const [email, accessToken] = tokenInfo.split(" ");
    const decoded = verifyToken(accessToken);
    if (email === decoded.email) {
        car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({
            success: true,
            car
        })
    } else {
        res.json({
            success: false,
            message: "unauthorize access"
        })
    }
})

exports.deleteCar = catchAsyncErrors(async (req, res, next) => {
    let car = await Car.findById(req.params.id)
    if (!car) return next(new ErrorHandler("Car not found", 404));
    const tokenInfo = req.headers.authorization;
    const [email, accessToken] = tokenInfo.split(" ");
    const decoded = verifyToken(accessToken);
    if (email === decoded.email) {
        await car.remove()
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
            message: "unauthorize access"
        })
    }


})

function verifyToken(token) {
    let email;
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, function (err, decoded) {
        if (err) {
            email = 'Invalid email';
        } else {
            email = decoded;
        }
    });
    return email;

}