const bcryptjs = require("bcryptjs")

//Contraseña sin encriptar
const encrypt = async(passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
};
//Pasar contraseña sin encriptar y  pasar contraseña encriptada
const compare = async(passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}
 
module.exports = {encrypt,compare};