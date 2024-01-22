// updateUserController.js

const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { verifyToken } = require("../TokenAuth/tokenAuth");

const updateUserController = {
  updateUser: async (req, res) => {
    try {
      const { guid, email, oldPassword, newPassword, } = req.body;
      const token = req.query;

      if (!token) {
        console.log("Token não fornecido")
        return res.status(401).json({ msg: "Erro de autenticação", status: 401 });
      }

      // Validando o token
      const decodedToken = verifyToken(token);

      if (!decodedToken) {
        return res.status(401).json({ msg: "Token inválido", status: 401 }); 
      }
      console.log(decodedToken);

      const user = await User.findOne({guid:guid})

      if(!user){
        return res.status(400).json({ msg: "Usuário não encontrado", status: 400 });
      }

      // Verifica se o email não está em branco e é diferente do atual
      email = email.trim()

      if ((email !== "") && (user.email !== email)) {
        user.email = email;
        await user.save();
      }

      // Verifica se a senha antiga e a nova senha foram fornecidas
      if (oldPassword && newPassword) {
        // Verifica se a senha antiga está correta
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ msg: "Senha antiga incorreta", status: 401 });
        }

        // Encripta a nova senha
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
      }

      res.status(200).json({ msg: "Usuário atualizado com sucesso", status: 200 });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro interno do servidor", status: 500 });
    }
  },
};

module.exports = updateUserController;
