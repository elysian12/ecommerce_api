const router = require('express').Router();
const { updateUser } = require('../controllers/user')
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/auth')


router.post('/:id', verifyTokenAndAdmin, updateUser)


module.exports = router;