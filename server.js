// server.js
import http from 'node:http'
import { config } from 'dotenv'
import app from './app.js'
import connectMongoose from './lib/connectMongoose.js'

// Cargar variables de entorno desde .env
config()

const port = process.env.PORT || 3000
const server = http.createServer(app)

// Conectar a MongoDB y luego levantar el servidor
async function main() {
  try {
    await connectMongoose()
    server.listen(port, () => {
      console.log(` Server started on http://localhost:${port}`)
    })
  } catch (err) {
    console.error(' Error starting the app:', err)
  }
}

main()
