const express = require("express")
const router = express.Router()
const Booking = require("../models/bookingModel")
const Car = require("../models/carModel")
const stripe = require("stripe")(
  "sk_test_51KwLTsSB02Ylevz3EV8dvHsPlb5THPgoDEEhquJc5NxzgWejBm8G5DFxTOiCq8DNkK6yTyuRdjphiub4VdKQfPSc00nQUjLmZ0"
)
const { v4: uuidv4 } = require("uuid")

router.post("/bookcar", async (req, res) => {
  //const { token } = req.body
  try {
    // PAYMENT ON HOLD

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: req.body.totalAmount * 100,
    //   currency: 'inr',
    //   payment_method_types: ['card'],
    // });
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // })
    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "INR",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // )
    const payment = true
    if (payment) {
      // req.body.transactionId = payment.source.id
      req.body.transactionId = "1234"
      const newBooking = new Booking(req.body)
      await newBooking.save()
      const car = await Car.findOne({ _id: req.body.car })
      car.bookedTimeSlots.push(req.body.bookedTimeSlots)
      await car.save()
      res.status(200).send("Booking successfull")
    } else {
      return res.status(400).json("Payment Error")
    }
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user')
    res.status(200).send(bookings)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
