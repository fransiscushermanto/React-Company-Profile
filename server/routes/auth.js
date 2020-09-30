const router = require("express-promise-router")();
const AuthController = require("../controllers/auth");

router.route("/login").post(AuthController.login);

module.exports = router;
