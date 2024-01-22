// loginUserController.js

const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Token = require("../TokenAuth/tokenAuth");

const loginUserController = {
  doLogin: async (req, res) => {
    try {
      const { email, password } = req.query;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: "Credenciais inválidas", status: 401, token: "", msg: "", email: "", guid: "" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Gere um token JWT
        const token = Token.createToken(user.guid, user.email);

        // Retorne o token na resposta
        return res.status(200).json({ token:token, msg: "Login bem-sucedido", email: user.email, guid: user.guid, status: 200 });
      } else {
        return res.status(401).json({ msg: "Credenciais inválidas", status: 401, token: "", msg: "", email: "", guid: "" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro interno do servidor", status: 500, token: "", msg: "", email: "", guid: "" });
    }
  }
}

module.exports = loginUserController;
