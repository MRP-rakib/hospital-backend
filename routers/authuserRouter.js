const {
  userSignupController,
  userLoginController,
  getUserController,
  deleteUserController,
} = require("../controllers/authUserController");
const authenticJWT = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/user/signup", userSignupController);
router.post("/user/login", userLoginController);
router.get("/user/profile", authenticJWT, getUserController);
router.delete("/user/profile", authenticJWT, deleteUserController);

module.exports = router;
