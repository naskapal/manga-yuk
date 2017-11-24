const router = require('express').Router()
const user = require('../controllers/userControllers')

router.post('/', user.create)
router.get('/', user.getAll)
router.get('/:id', user.getById)
router.put('/:id', user.update)
router.delete('/:id', user.remove)
router.post('/login', user.login)

module.exports = router
