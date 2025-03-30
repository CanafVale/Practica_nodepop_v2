// controllers/loginController.js
import { findUserByEmail, validatePassword } from '../models/User.js'

export function index(req, res) {
  res.locals.error = ''
  res.locals.email = ''
  res.render('login')
}

export function postLogin(req, res) {
  const { email, password } = req.body
  const redir = req.query.redir

  const user = findUserByEmail(email)

  if (!user || !validatePassword(user, password)) {
    res.locals.error = 'Credenciales incorrectas'
    res.locals.email = email
    return res.render('login')
  }

  req.session.userId = user.id // importante que coincida con 'owner' en fakeProducts
  res.redirect(redir || '/')
}

export function logout(req, res, next) {
  req.session.regenerate(err => {
    if (err) return next(err)
    res.redirect('/login')
  })
}
