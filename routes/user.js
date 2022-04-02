const router = require('express').Router();
const { updateUser } = require('../controllers/user')
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/auth')


router.post('/:id', verifyTokenAndAuthorization, updateUser)


module.exports = router;