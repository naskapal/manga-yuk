const jwt = require('jsonwebtoken')
require('dotenv').config()

const isLogin = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY, function(err, decoded) {
    if(err) {
      res.send('Permission denied! You must login to continue!')
    }
    else {
      req.verifyUser = decoded
      next()
    }
  })
}

const isAdmin = (req, res, next) => {
  if(req.verifyUser.isAdmin) {
    next()
  } else {
    res.send('Only Admin can access')
  }
}

const isAuthUser = (req, res, next) => {
  if(req.verifyUser.isAdmin || req.verifyUser.id === req.params.id) {
    next()
  } else {
    res.send('Only Admin or authenticate user can access')
  }
}

module.exports = {
  isLogin,
  isAdmin,
  isAuthUser
}
