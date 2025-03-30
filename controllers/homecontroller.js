import products from '../lib/fakeProducts.js'

export async function index(req, res, next) {
  try {
    res.locals.products = products
    res.render('home')
  } catch (err) {
    next(err)
  }
}
