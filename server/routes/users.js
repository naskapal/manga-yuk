const router = require('express').Router()
const user = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', user.create)
router.post('/login', user.login)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, user.getAll)
router.get('/:id', checkAuth.isLogin, checkAuth.isAuthUser, user.getById)
router.put('/:id', checkAuth.isLogin, checkAuth.isAuthUser, user.update)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAdmin, user.remove)

module.exports = router
