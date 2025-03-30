import readline from 'node:readline/promises'
import connectMongoose from './lib/connectMongoose.js'
import User from './models/User.js'
import Product from './models/Product.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

// Confirmación previa
const answer = await ask('⚠️ Are you sure you want to delete all users and products? (y/n): ')
if (answer.toLowerCase() !== 'y') {
  console.log('Operation aborted.')
  process.exit()
}

// Inicialización
await initUsers()
await initProducts()

await connection.close()
console.log('✅ Database initialization completed.')

async function initUsers() {
  const result = await User.deleteMany()
  console.log(`Deleted ${result.deletedCount} users.`)

  const insertedUsers = await User.insertMany([
    {
      email: 'admin@nodepop.com',
      password: await User.hashPassword('1234'),
    },
    {
      email: 'user@nodepop.com',
      password: await User.hashPassword('1234'),
    },
  ])

  console.log(`Inserted ${insertedUsers.length} users.`)
  return insertedUsers
}

async function initProducts() {
  const result = await Product.deleteMany()
  console.log(`Deleted ${result.deletedCount} products.`)

  const users = await User.find()

  const insertedProducts = await Product.insertMany([
    {
      name: 'iPhone',
      price: 750,
      photo: 'iphone.jpg',
      tags: ['mobile', 'lifestyle'],
      owner: users[0]._id,
    },
    {
      name: 'Mountain Bike',
      price: 500,
      photo: 'bike.jpg',
      tags: ['lifestyle', 'motor'],
      owner: users[1]._id,
    },
    {
      name: 'Esterilla Yoga',
      price: 312,
      photo: 'esterilla_yoga.jpg',
      tags: ['lifestyle'],
      owner: users[0]._id,
    },
    {
      name: 'Funda movil color verde',
      price: 555,
      photo: 'funda_movil_verde.jpg',
      tags: ['mobile'],
      owner: users[0]._id,
    },
    {
      name: 'Manta de yoga',
      price: 479,
      photo: 'manta_yoga.jpg',
      tags: ['lifestyle'],
      owner: users[0]._id,
    },
    {
      name: 'GPS coche',
      price: 872,
      photo: 'gps_coche.jpg',
      tags: ['mobile', 'motor'],
      owner: users[0]._id,
    },
    {
      name: 'Mochila urbana',
      price: 917,
      photo: 'mochila_urbana.jpg',
      tags: ['lifestyle'],
      owner: users[0]._id,
    },
    {
      name: 'Mochila amarilla',
      price: 344,
      photo: 'mochila_urbana_amarilla.jpg',
      tags: ['lifestyle'],
      owner: users[0]._id,
    },
    {
      name: 'Patinete eléctrico',
      price: 284,
      photo: 'patinete_electrico.jpg',
      tags: ['motor', 'work'],
      owner: users[0]._id,
    },
    {
      name: 'Vespa',
      price: 324,
      photo: 'vespa.jpg',
      tags: ['motor'],
      owner: users[1]._id,
    },
    {
      name: 'Cascos running',
      price: 477,
      photo: 'cascos_running.jpg',
      tags: ['mobile', 'lifestyle'],
      owner: users[1]._id,
    },
    {
      name: 'Cascos Beats',
      price: 190,
      photo: 'cascos_beats.jpg',
      tags: ['mobile'],
      owner: users[1]._id,
    }
  ])

  console.log(`Inserted ${insertedProducts.length} products.`)
}

async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const result = await rl.question(question)
  rl.close()
  return result
}
