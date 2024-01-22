require('dotenv').config();
const mongoose = require("mongoose")

async function main(){
    try{
        await mongoose.connect("mongodb+srv://userdata:uhbLKzmCPw23pfQR@cluster.2eufin4.mongodb.net/?retryWrites=true&w=majority")
        console.log("Conectado ao banco")
    } catch(error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = main;