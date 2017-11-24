const Storage = require('@google-cloud/storage');
const Multer = require('multer')
require('dotenv').config()

const storage = Storage({
  projectId: process.env.PROJECTID,
  keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(process.env.BUCKET)


const getLink = fileName => {
  return `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`
}

const uploadImages = (req, res, next) => {
  if (!req.files) {
    next()
  }
  
  console.log("sekarang masuk uploadImages");

  let fileNames = []

  req.files.forEach(file => {
    fileNames.push(`${Date.now()}__${file.originalname}`)
  })

  let publicFileNames = []

  fileNames.forEach((fileName, index) => {
    let file = bucket.file(fileName)
    stream = file.createWriteStream({
      metadata: {
        contentType: req.files[index].mimetype
      }
    })
    stream.on('error', (err) => {
      req.files[index].cloudStorageError = err
      console.log("error di stream lho");
      next(err)
    })

    stream.on('finish', () => {
      req.files[index].cloudStorageObject = fileName
      file.makePublic().then(success => {
        publicFileNames.push(getLink(fileName))
        if (fileNames.length === publicFileNames.length) {
          req.headers.publicFileNames = publicFileNames
          next()
        }
      })
      .catch(err => {
        console.error(err);
      })
    })
    stream.end(req.files[index].buffer)
  })
}

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

module.exports = {
  getLink,
  uploadImages,
  multer
};
