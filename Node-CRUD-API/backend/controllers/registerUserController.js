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
        res.status(409).json({message:"E-mail já existente"})
        return 
      }

      // Gera um GUID único
      const guid = uuidv4();

      // Encripta a senha
      const Rounds = 10
      const passwordEncrypted = await bcrypt.hash(password,Rounds);
      
      
      // Cria usuário
      const user = await User.create({ email, password: passwordEncrypted, guid });
      
      // Cria Token de autenticação
      const token = await Token.createToken(user.guid, user.email);
      

      res.status(201).json({
        token: token,
        msg: "Registro bem-sucedido",
        user: { guid: user.guid, email: user.email },
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = registerController;
