export const authMiddleware = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId
    next()
  } else {
    res
      .status(401)
      .json({ status: 'failed', message: 'Access denied. Please log in.' })
  }
}
