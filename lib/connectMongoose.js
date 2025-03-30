import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // ← Esto es lo que carga el archivo .env

export default async function connectMongoose() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI not found in .env')
  }

  await mongoose.connect(uri)
  console.log(' Connected to MongoDB Atlas')
}