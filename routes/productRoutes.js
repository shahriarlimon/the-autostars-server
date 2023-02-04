const express = require('express');
const { getCars, createCar, updateCar, deleteCar, getSingleCar, getUploadedCarsbyUser } = require('../controller/product');
const router = express.Router();
router.post('/create', createCar)
router.get('/', getCars)
router.get("/uploaded-cars", getUploadedCarsbyUser)
router.get("/:id", getSingleCar)
router.put('/:id', updateCar)
router.delete("/:id", deleteCar)

module.exports = router;