const express = require("express");
const router = require("express-promise-router")();

const AdminController = require("../controllers/admin");

router.route("/verifyToken").post(AdminController.verifyToken);

router.route("/generateToken").post(AdminController.generateToken);

router.route("/getListUsers").post(AdminController.getListUsers);

router.route("/getAllLevels").post(AdminController.getAllLevels);

module.exports = router;
