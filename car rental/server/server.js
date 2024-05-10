const express = require("express")

require("dotenv").config()
const dbConnection = require("./db")
const app = express()


app.use(express.json())
const port = process.env.PORT || 5000
var cors = require('cors')

app.use(cors())
app.use("/api/cars", require("./routes/carsRoute"))
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/bookings", require("./routes/bookingsRoute"))

app.get("/", (req, res) => res.send("Hello World"))

app.listen(port, () => {
  console.log(`App running on port ${port} yo`)
})
