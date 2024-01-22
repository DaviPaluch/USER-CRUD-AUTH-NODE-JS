// deleteUserRoute.js

const router = require("express").Router()
const updateUserController = require("../controllers/updateUserController")

//End-Point
router.put("/", (req,res) => updateUserController.updateUser(req,res))
