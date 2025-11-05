const {
  userSignupController,
  userLoginController,
  getUserController,
  deleteUserController,
  changePasswordController,
  changeUserInfoController,
  uploadImageController

} = require("../controllers/authController");
const authenticJWT = require("../middlewares/authMiddleware");
const upload = require('../config/multer')

const router = require("express").Router();

router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.get("/profile", authenticJWT, getUserController);
router.delete("/profile", authenticJWT, deleteUserController);
router.patch("/profile", authenticJWT, changePasswordController);
router.put('/profile',authenticJWT, changeUserInfoController)
router.put('/avatar',authenticJWT, upload.single('image') ,uploadImageController)

module.exports = router;
