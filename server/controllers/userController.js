const Comic = require('./comicController');
// const User = require('../models/userModel');
const Image = require('../helpers/image');

const uploadComic = (req, res) => {
  Image.multer.array('image'),
  Image.uploadImages,
  (req, res) => {
    res.send({
      status: 200,
      msg: "success",
      link: req.headers.publicFileNames
    })
  }
}



module.exports = {
  uploadComic
};
