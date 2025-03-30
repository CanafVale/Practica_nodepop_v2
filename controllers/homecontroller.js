// controllers/homeController.js
import Product from '../models/Product.js'

export async function index(req, res, next) {
  try {
    const userId = req.session.userId

    const userProducts = await Product.find({ owner: userId }).exec()

    res.render('home', { products: userProducts })
  } catch (err) {
    next(err)
  }
}
