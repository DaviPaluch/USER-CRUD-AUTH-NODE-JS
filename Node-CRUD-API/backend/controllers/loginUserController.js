// loginUserController.js

const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Token = require("../TokenAuth/tokenAuth");


const loginUserController = {
  doLogin: async (req,res)  => {
    try {
      const { email, password } = req.query;

      const user = await User.findOne({ email })

      if (!user) {
        res.status(401).json({message:"Credenciais inválidas"})
        return 
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Gere um token JWT
        const token = Token.createToken(user.guid,user.email)

        // Retorne o token na resposta
        return res.status(200).json({ token, msg: "Login bem-sucedido",email:user.email,guid:user.guid});
      } else {
        
        return res.status(401).json({message:"Credenciais inválidas"})
      }
    } catch (error) {
      console.log(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = loginUserController;
