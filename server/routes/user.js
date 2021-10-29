const express = require("express")
const router = express.Router()
const { usersController } = require("../controllers")

router.post("/photo", usersController.photo.post)
router.post("/signup", usersController.signup.post)
router.get("/auth", usersController.auth.get)

module.exports = router
