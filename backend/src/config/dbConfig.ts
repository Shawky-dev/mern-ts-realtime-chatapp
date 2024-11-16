const mongoose = require("mongoose")

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI)
    console.log("Connected to MongoDB")
  } catch (error:any) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}
