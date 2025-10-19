const adminSignupController = require("../controllers/authAdminController");

const router = require("express").Router();

router.post("/admin/signup", adminSignupController);

module.exports = router;
