// require libraries
const ObjectId = require('mongodb').ObjectId

const User = require('../models/userModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const passwordDecrypt = require('../helpers/passwordDecrypt')
const generateToken = require('../helpers/token')

// create user
const create = (req, res) => {
  passwordEncrypt(req.body.password)
  .then(encryptedPass => {
    let user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: encryptedPass,
      email: req.body.email,
      gender: req.body.gender
    })

    user.save()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

// get all users
const getAll = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

// get user by id
const getById = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

// update user
const update = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => {
    user.first_name = req.body.first_name || user.first_name,
    user.last_name = req.body.last_name || user.last_name,
    user.username = req.body.username || user.username,
    user.email = req.body.email || user.email,
    user.gender = req.body.gender || user.gender,
    user.photo_profile = req.body.photo_profile || user.photo_profile,
    user.isAdmin = req.body.isAdmin || user.isAdmin
    user.updatedAt = new Date()

    user.save()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

// change password
const changePassword = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => {
    passwordEncrypt(req.body.password)
    .then(encryptedPass => {
      user.password = encryptedPass || user.password

      user.save()
      .then(result => res.send(result))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

// delete user
const remove = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findByIdAndRemove(id)
  .then(() => res.send('success remove user'))
  .catch(err => res.status(500).send(err))
}

// login user
const login = (req, res) => {
  console.log('bodydata', req.body);
  User.findOne({username: req.body.username})
  .then(user => {
    console.log(user);
    // console.log(req.body);
    passwordDecrypt(req.body.password, user.password)
    .then(success => {
      console.log('masuk');
      if(success) {
        generateToken(user)
        .then(token => {
          res.send({
            token: token,
            msg: 'Login success'
          })
        })
        .catch(err => res.status(500).send(err))
      } else {
        res.send('Login failed! Incorrect username or password')
      }
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  changePassword,
  remove,
  login
}
