// require libraries
const ObjectId = require('mongodb').ObjectId

const Manga = require('../models/mangaModel')

const create = (req, res, next) => {
  console.log(req.verifyUser);
  console.log("sekarang masuk manga create");
  
  // console.log(req.headers.publicFileNames);
  // console.log(`===================== ${req.headers.publicFileNames}`);
  // Manga.find({title: req.verifyUser._id})
  // .then(response => {
  console.log(req.body);
    let manga = new Manga({
      uploader: ObjectId('5a1757f743a4a905844118c1'),
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      summary: req.body.summary,
      img: req.headers.publicFileNames
    })

    console.log("sekarang sudah sampai di sebelum ngesave");
    
    manga.save()
    .then(result =>  next() ) //res.send(result))
    .catch(err => console.log(err))//res.status(500).send(err))
  // })
}

const getAll = (req, res, next) => {
  Manga.find().populate('uploader')
  .then(mangaList => res.send(mangaList))
  .catch(err => res.status(500).send(err))
}

const getOne = (req, res, next) => {
  Manga.find({title: req.body.title}).populate('uploader')
  .then(manga => res.send(manga))
  .catch(err => res.status(500).send(err))
}

const update = (req, res, next) => {
  let id = {_id: ObjectId(req.params.id)}
  Manga.findById(id)
  .then(manga => {
    manga.title = req.body.title || manga.title
    manga.author = req.body.author || manga.author
    manga.genre = req.body.genre || manga.genre
    manga.summary = req.body.summary || manga.summary

    manga.save()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

const remove = (req, res, next) => {
  let id = {_id: ObjectId(req.params.id)}

  Manga.findByIdAndRemove(id)
  .then(() => res.send('Success delete manga'))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}
