// registerUserRoute.js

const router = require("express").Router()
const registerController = require("../controllers/registerUserController")

// End-Point
router.post("/",(req,res) => registerController.create(req,res))

router.get("/ping", (req, res) => {
    res.status(200).json({ message: "Server isssss online" });
    });



module.exports = router