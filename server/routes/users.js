const router = require('express').Router()
const User = require('../controllers/userController');
const Image = require('../helpers/image');

router.post('/upload',
Image.multer.array('image'),
Image.uploadImages,
(req, res) => {
  console.log(req.headers);
  res.send({
    status: 200,
    msg: "success",
    link: req.headers.publicFileNames
  })
})

module.exports = router;
