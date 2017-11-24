const router = require('express').Router()
const manga = require('../controllers/mangaControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, checkAuth.isAuthUser, manga.create)
router.get('/', manga.getAll)
router.post('/search', checkAuth.isLogin, manga.getOne)
router.put('/:id', checkAuth.isLogin, checkAuth.isAuthUser, manga.update)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAuthUser, manga.remove)

module.exports = router
