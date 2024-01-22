// router.js

const router = require("express").Router();
const loginUserRoute = require("./loginUserRoute");
const registerUserRoute = require("./registerUserRoute");
const updateUserRoute = require("./updateUserRoute")

// Rotas

router.use("/login", loginUserRoute);
router.use("/register", registerUserRoute);
router.use("/update", updateUserRoute);


// Middleware de tratamento de erros

router.use((err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);

    res.status(err.status || 500).json({
      error: "Erro interno do servidor"
    });
  });

  
module.exports = router;
