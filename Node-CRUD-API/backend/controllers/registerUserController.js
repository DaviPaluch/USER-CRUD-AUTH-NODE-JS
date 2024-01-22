// registerController.js

const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const Token = require("../TokenAuth/tokenAuth");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

const registerController = {
  create: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verifica existência de e-mail
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(409).json({ msg: "E-mail já existente", status: 409 });
      }

      // Gera um GUID único
      const guid = uuidv4();

      // Encripta a senha
      const Rounds = 10;
      const passwordEncrypted = await bcrypt.hash(password, Rounds);

      // Cria usuário
      const user = await User.create({ email, password: passwordEncrypted, guid });

      res.status(201).json({
        msg: "Registro bem-sucedido",
        status: 201
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro interno do servidor", status: 500 });
    }
  },
};

module.exports = registerController;
