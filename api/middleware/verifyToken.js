const { verifyTokenService } = require('../tokens/tokenService')

const verifyToken = async (req, res, next) => {
  const { cookies } = req

  try {
    if (!cookies || !cookies.token) {
      return res.sendStatus(403).json({
        message: 'authorization required',
      })
    }

    const { token } = cookies
    const userToken = verifyTokenService(token)

    req.user = userToken
    next()
  } catch (e) {
    return res.sendStatus(403).json({
      message: 'invalid or expired token',
    })
  }
}

module.exports = verifyToken
