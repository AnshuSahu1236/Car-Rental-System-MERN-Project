const express = require("express")
const router = express.Router()
const User = require("../models/userModel")

router.post("/login", async (req, res) => {
  const { username, password, email } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(400).json("Some Error")
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/register", async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      res.status(400).send("Email already exists")
    } else {
      const newUser = await User(req.body)
      await newUser.save()
      res.send("User Registered Successfully")
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
