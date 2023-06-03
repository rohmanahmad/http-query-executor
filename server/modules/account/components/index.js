// Auth
const authLogin = require('./auth/login')
const authLogout = require('./auth/logout')
const authRefreshToken = require('./auth/refresh-token')

// Profile
const profileInfo = require('./profile/info')
const profileRegister = require('./profile/register')
const profileUpdate = require('./profile/update')

module.exports = [
  authLogin,
  authLogout,
  authRefreshToken,
  profileInfo,
  profileRegister,
  profileUpdate,
]