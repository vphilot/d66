const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_KEY

const createTokenService = (user) => {
  const token = jwt.sign(user, KEY)
  return token
}

const verifyTokenService = (token) => {
  let user

  jwt.verify(token, KEY, (err, decodedToken) => {
    if (err) {
      throw err
    }
    user = decodedToken
  })

  return user
}

module.exports = { createTokenService, verifyTokenService }