// controllers/loginController.js
import User, { findUserByEmail, validatePassword } from '../models/User.js'

export function index(req, res) {
  res.locals.error = ''
  res.locals.email = ''
  res.render('login')
}

export async function postLogin(req, res) {
  const { email, password } = req.body
  const redir = req.query.redir

  const user = await findUserByEmail(email)

  if (!user || !(await validatePassword(user, password))) {
    res.locals.error = 'Credenciales incorrectas'
    res.locals.email = email
    return res.render('login')
  }

  // Login exitoso
  req.session.userId = user._id
  req.session.email = user.email
  res.redirect(redir || '/')
}

export function logout(req, res, next) {
  req.session.regenerate(err => {
    if (err) return next(err)
    res.redirect('/login')
  })
}
