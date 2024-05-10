const mongoose = require("mongoose")

function connectDB() {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  const connection = mongoose.connection
  connection.on("connected", () => {
    console.log("Mongo db connected success!")
  })
  connection.on("error", () => {
    console.log("mongo failed")
  })
}

connectDB()

module.exports = mongoose
