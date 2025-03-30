import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import * as loginController from './controllers/loginController.js'
import * as homeController from './controllers/homeController.js'
import * as sessionManager from './lib/sessionManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Configurar EJS para archivos .html
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', (await import('ejs')).__express)


// Rutas de login
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)

app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Productos de ejemplo
const products = [
  {
    name: 'iPhone',
    price: 799,
    tags: ['mobile', 'lifestyle'],
    image: '/images/iphone.jpg'
  },
  {
    name: 'Patinete eléctrico',
    price: 350,
    tags: ['lifestyle', 'motor'],
    image: '/images/patinete.jpg'
  }
]

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', { products })
})

export default app
