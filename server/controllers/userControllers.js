const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const passwordDecrypt = require('../helpers/passwordDecrypt')

const create = (req, res) => {
  passwordEncrypt(req.body.password)
  .then(encryptedPass => {
    let user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: encryptedPass,
      email: req.body.email,
      gender: req.body.gender,
      photo_profile: req.body.photo_profile,
      isAdmin: req.body.isAdmin
    })

    user.save()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

const update = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => {
    passwordEncrypt(req.body.password)
    .then(encryptedPass => {
      user.first_name = req.body.first_name || user.first_name,
      user.last_name = req.body.last_name || user.last_name,
      user.username = req.body.username || user.username,
      user.password = encryptedPass || user.password,
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
  })
  .catch(err => res.status(500).send(err))
}

const remove = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findByIdAndRemove(id)
  .then(() => res.send('success remove user'))
  .catch(err => res.status(500).send(err))
}

const login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    passwordDecrypt(req.body.password, user.password)
    .then(success => {
      res.send(success)
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  login
}
