// updateUserController.js

const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { verifyToken } = require("../TokenAuth/tokenAuth");

const updateUserController = {
  updateUser: async (req, res) => {
    try {
      const { guid, email, oldPassword, newPassword } = req.body;
      const token = req.headers.authorization;

      if (!token) {
        console.log("Token não fornecido")
        return res.status(401).json({ error: "Erro de autenticação" });
      }

      // Validando o token
      const decodedToken = verifyToken(token);

      if (!decodedToken) {
        return res.status(401).json({ error: "Token inválido" }); 
      }
      console.log(decodedToken);

      const user = await User.findOne({guid:guid})

      if(!user){
        return res.status(400).json({ error: "Usuário não encontrado" });
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
            return res.status(401).json({ error: "Senha antiga incorreta" });
        }

        // Encripta a nova senha
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
      }

      res.status(200).json({ msg: "Usuário atualizado com sucesso" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

module.exports = updateUserController;
