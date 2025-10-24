const {
  userSignupController,
  userLoginController,
  getUserController,
  deleteUserController,
  changePasswordController,

} = require("../controllers/authController");
const authenticJWT = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.get("/profile", authenticJWT, getUserController);
router.delete("/profile", authenticJWT, deleteUserController);
router.patch("/profile", authenticJWT, changePasswordController);

module.exports = router;
