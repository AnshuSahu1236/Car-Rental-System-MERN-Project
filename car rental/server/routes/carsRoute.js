const express = require("express")
const router = express.Router()
const Car = require("../models/carModel")
const Booking = require("../models/bookingModel")


router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find()
    res.send(cars)
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.post("/addcar", async (req, res) => {
  try {
    const newCar = new Car(req.body)
    await newCar.save()
    res.status(200).send("Car addedd successfully")
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id })
    car.name = req.body.name
    car.image = req.body.image
    car.rentPerHour = req.body.rentPerHour
    car.capacity = req.body.capacity
    car.fuelType = req.body.fuelType
    await car.save()
    res.status(200).send("Car edited successfully")
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid })
    await Booking.deleteMany({ car: req.body.carid })
 
    res.status(200).send("Car Deleted successfully")
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = router
