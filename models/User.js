// models/User.js
const users = [
  {
    id: 'user1',
    email: 'demo@example.com',
    password: '1234'
  },
  {
    id: 'user2',
    email: 'otra@example.com',
    password: '5678'
  }
]

export function findUserByEmail(email) {
  return users.find(user => user.email === email)
}

export function validatePassword(user, password) {
  return user.password === password
}
