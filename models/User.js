// models/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.statics.hashPassword = function (plaintextPassword) {
  return bcrypt.hash(plaintextPassword, 10)
}

const User = mongoose.model('User', userSchema)

export default User

export async function findUserByEmail(email) {
  return await User.findOne({ email })
}

export async function validatePassword(user, plainPassword) {
  return await bcrypt.compare(plainPassword, user.password)
}
