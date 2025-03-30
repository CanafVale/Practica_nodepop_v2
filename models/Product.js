// models/Product.js
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  photo: { type: String },
  tags: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }]
})

const Product = mongoose.model('Product', productSchema)

export default Product
