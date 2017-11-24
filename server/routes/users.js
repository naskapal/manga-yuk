const router = require('express').Router()
const User = require('../controllers/userController');
const Image = require('../helpers/image');
const user = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

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

router.post('/', user.create)
router.post('/login', user.login)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, user.getAll)
router.get('/:id', checkAuth.isLogin, checkAuth.isAuthUser, user.getById)
router.put('/:id', checkAuth.isLogin, checkAuth.isAuthUser, user.update)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAdmin, user.remove)

module.exports = router
