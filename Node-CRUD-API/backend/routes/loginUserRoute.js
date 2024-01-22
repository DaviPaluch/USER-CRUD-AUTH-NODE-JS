//loginUserRoute.js

const loginUserController = require("../controllers/loginUserController")
const router = require("express").Router()

// End-Point
router.get("/", (req,res) => loginUserController.doLogin(req,res))


module.exports = router

