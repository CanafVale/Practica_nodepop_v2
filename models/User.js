// models/User.js
const users = [
    {
      id: '1',
      email: 'admin@example.com',
      password: '1234' // en versión real usaríamos hash
    }
  ]
  
  export function findUserByEmail(email) {
    return users.find(user => user.email === email)
  }
  
  export function validatePassword(user, password) {
    return user.password === password
  }
  