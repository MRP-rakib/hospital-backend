const router = require('express').Router() 
const { CreateUserController, LoginUserController, GetProfileController, RefreshTokenController, uploadProfileImageController, UpdateUserDataController, UpdatePassController, DeleteUserController, DeleteProfileImageController } = require('../controllers/authController')
const assignRole = require('../middlewares/assignRole')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multer')

router.post('/register',assignRole,CreateUserController)
router.post('/login',assignRole,LoginUserController)
router.get('/profile',authMiddleware,assignRole,GetProfileController)
router.put('/update-user/:id',authMiddleware,assignRole,UpdateUserDataController)
router.patch('/change-password/:id',authMiddleware,assignRole,UpdatePassController)
router.delete('/delete-account/:id',authMiddleware,assignRole,DeleteUserController)
router.post('/refresh-token',RefreshTokenController)
router.put('/upload-image/:id',authMiddleware,assignRole,upload.single('image'),uploadProfileImageController)
router.delete('/delete-image/:id',authMiddleware,assignRole,DeleteProfileImageController)

module.exports = router