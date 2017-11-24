const bcrypt = require('bcryptjs')

module.exports = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if(err) {
          reject(err)
        }
        else {
          password = hash
          resolve(password)
        }
      })
    })
  })
}
