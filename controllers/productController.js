import Product from '../models/Product.js'

export function newProductForm(req, res) {
  res.render('new-product')
}

export async function createProduct(req, res, next) {
  try {
    const { name, price, tags, photo } = req.body

    const newProduct = new Product({
      name,
      price,
      tags: Array.isArray(tags) ? tags : [tags],
      photo,
      owner: req.session.userId
    })

    await newProduct.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      owner: req.session.userId
    })

    if (!product) {
      return res.status(403).send('No tienes permiso para eliminar este producto.')
    }

    await product.deleteOne()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
