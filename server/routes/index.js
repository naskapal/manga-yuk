const router = require('express').Router()
const Image = require('../helpers/image');

router.post('/test',
Image.multer.array('image'),
Image.uploadImages,
(req, res) => {
  res.send({
    status: 200,
    msg: "success",
    link: req.headers.publicFileNames
  })
})

module.exports = router;
