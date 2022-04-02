const router = require('express').Router();
const { updateUser, getUser, getAllUser } = require('../controllers/user')
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/auth')


router.post('/:id', verifyTokenAndAuthorization, updateUser)
router.get('/:id', verifyTokenAndAuthorization, getUser)
router.get('/', verifyTokenAndAdmin, getAllUser)


module.exports = router;