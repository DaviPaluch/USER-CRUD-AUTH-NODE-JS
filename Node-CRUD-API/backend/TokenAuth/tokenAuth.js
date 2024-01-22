// createToken.js

const jwt = require("jsonwebtoken");
const secret = require("./secret");

function createToken(guid, email) {
  
  const value = secret()
  // Gera o token
  const token = jwt.sign({ guid, email }, value, { expiresIn: "1h" });

  return token;
}

function verifyToken(token) {
  const secretValue = secret();

  try {
    // Verifica o token
    const decoded = jwt.verify(token, secretValue);
    return decoded;
  } catch (error) {

    console.error("Erro ao verificar o token:", error);
    return null;
  }
}

module.exports = {createToken, verifyToken};
