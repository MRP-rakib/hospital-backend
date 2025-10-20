const {
  userSignupController,
  userLoginController,
  getUserController,
  deleteUserController,
} = require("../controllers/authController");
const authenticJWT = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.get("/profile", authenticJWT, getUserController);
router.delete("/profile", authenticJWT, deleteUserController);

module.exports = router;
