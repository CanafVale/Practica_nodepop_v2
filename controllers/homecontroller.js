// controllers/homeController.js
import products from '../lib/fakeProducts.js'

export async function index(req, res, next) {
  try {
    const userId = req.session.userId
    const userProducts = products.filter(product => product.owner === userId)
    res.render('home', { products: userProducts })
  } catch (err) {
    next(err)
  }
}
