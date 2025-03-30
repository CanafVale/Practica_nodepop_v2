// lib/sessionManager.js
import session from 'express-session'

export const middleware = session({
  secret: 'nodepop-secret',
  resave: false,
  saveUninitialized: true
})

export function useSessionInViews(req, res, next) {
  res.locals.session = req.session
  next()
}
