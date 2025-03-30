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
