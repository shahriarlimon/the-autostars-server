const express = require('express');
const { getCars, createCar, updateCar, deleteCar } = require('../controller/product');
const router = express.Router();
router.post('/', createCar)
router.get('/', getCars)
router.put('/:id', updateCar)
router.delete("/:id", deleteCar)

module.exports = router;