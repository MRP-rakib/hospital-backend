const router = require('express').Router() 
const { CreateUserController, LoginUserController, GetProfileController, RefreshTokenController, uploadProfileImageController, UpdateUserDataController } = require('../controllers/authController')
const assignRole = require('../middlewares/assignRole')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multer')

router.post('/register',assignRole,CreateUserController)
router.post('/login',assignRole,LoginUserController)
router.get('/profile',authMiddleware,assignRole,GetProfileController)
router.put('/profile/:id',authMiddleware,assignRole,UpdateUserDataController)
router.post('/refresh',RefreshTokenController)
router.put('/avatar',authMiddleware,assignRole,upload.single('image'),uploadProfileImageController)

module.exports = router