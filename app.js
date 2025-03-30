// app.js
import path from 'node:path'
import express from 'express'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import { guard } from './lib/sessionManager.js'
import multer from 'multer'

import * as loginController from './controllers/loginController.js'
import * as homeController from './controllers/homeController.js'
import * as sessionManager from './lib/sessionManager.js'
import * as productController from './controllers/productController.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const upload = multer({ dest: 'uploads/' })

// Motor de vistas
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', (await import('ejs')).__express)

// Variables globales
app.locals.appName = 'Nodepop'

// Middlewares
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.post('/products', guard, upload.single('photo'), productController.createProduct)

// Rutas
app.get('/', sessionManager.guard, homeController.index)

app.get('/login', (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/')
  }
  loginController.index(req, res, next)
})
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)



app.get('/products/new', guard, productController.newProductForm)
app.post('/products', guard, productController.createProduct)
app.post('/products/:id/delete', guard, productController.deleteProduct)


export default app
