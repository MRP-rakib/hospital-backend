const router = require('express').Router() 
const { CreateUserController, LoginUserController, GetProfileController, RefreshTokenController, uploadProfileImageController } = require('../controllers/authController')
const assignRole = require('../middlewares/assignRole')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multer')

router.post('/register',assignRole,CreateUserController)
router.post('/login',assignRole,LoginUserController)
router.get('/profile',assignRole,authMiddleware,GetProfileController)
router.post('/refresh',RefreshTokenController)
router.put('/avatar',assignRole,authMiddleware,upload.single('image'),uploadProfileImageController)

module.exports = router