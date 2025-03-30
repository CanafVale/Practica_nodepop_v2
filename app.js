// app.js
import path from 'node:path'
import express from 'express'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import * as loginController from './controllers/loginController.js'
import * as homeController from './controllers/homeController.js'
import * as sessionManager from './lib/sessionManager.js'
import productos from './lib/fakeProducts.js'
import { guard } from './lib/sessionManager.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', (await import('ejs')).__express)

app.locals.appName = 'Nodepop'

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)


// Home (protegido: solo usuarios logueados)
app.get('/', guard, (req, res) => {
  // Filtrar productos por usuario logueado
  const productosDelUsuario = productos.filter(product => product.owner === req.session.userId)
  res.render('home', { products: productosDelUsuario })
})

// Login y logout
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)
app.get('/', guard, homeController.index)

// app.js
app.get('/login', (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/')
  }
  loginController.index(req, res, next)
})







export default app