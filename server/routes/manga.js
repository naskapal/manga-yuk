const router = require('express').Router()
const manga = require('../controllers/mangaControllers')

router.post('/', manga.create)
router.get('/', manga.getAll)
router.post('/search', manga.getOne)
router.put('/:id', manga.update)
router.delete('/:id', manga.remove)

module.exports = router
