// controllers/homeController.js

import Product from '../models/Product.js'

export async function index(req, res, next) {
  try {
    const userId = req.session.userId

    const filters = { owner: userId }

    // Filtro por nombre que empieza por...
    if (req.query.name) {
      filters.name = new RegExp('^' + req.query.name, 'i')
    }

    // Filtro por tag
    if (req.query.tag) {
      filters.tags = req.query.tag
    }

    // Filtro por precio (min-max, min-, -max o exacto)
    if (req.query.price) {
      const priceParts = req.query.price.split('-')
      if (priceParts.length === 2) {
        const [min, max] = priceParts
        filters.price = {}
        if (min) filters.price.$gte = Number(min)
        if (max) filters.price.$lte = Number(max)
      } else {
        filters.price = Number(req.query.price)
      }
    }

    // Paginación
    const page = parseInt(req.query.page) || 1
    const limit = 5
    const skip = (page - 1) * limit

    const total = await Product.countDocuments(filters)
    const products = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 }) // Orden alfabético por nombre

    res.render('home', {
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      query: req.query,
    })

  } catch (err) {
    next(err)
  }
}
