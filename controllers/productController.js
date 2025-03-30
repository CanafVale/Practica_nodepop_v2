import Product from '../models/Product.js'
import path from 'node:path'
import fs from 'node:fs'

export async function newProductForm(req, res) {
  res.render('new-product')
}

export async function createProduct(req, res, next) {
  try {
    const { name, price, tags } = req.body
    const userId = req.session.userId

    let photoFileName = ''

    if (req.file) {
      // Guardar la imagen como userID+nombreproducto.jpg
      const sanitizedProductName = name.replace(/\s+/g, '_').toLowerCase()
      photoFileName = `${userId}-${sanitizedProductName}${path.extname(req.file.originalname)}`
      const destPath = path.join('public/images', photoFileName)

      fs.renameSync(req.file.path, destPath)
    }

    const product = new Product({
      name,
      price,
      tags: Array.isArray(tags) ? tags : [tags],
      owner: userId,
      photo: photoFileName
    })

    await product.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product || product.owner.toString() !== req.session.userId) {
      return res.status(403).send('Unauthorized')
    }

    await Product.deleteOne({ _id: req.params.id })
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
