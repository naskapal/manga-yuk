const bcrypt = require('bcryptjs')

module.exports = function(passwordInput, passwordHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordInput, passwordHash, function(err, success) {
      if(err) {
        reject(err)
      } else {
        resolve(success)
      }
    })
  })
}
