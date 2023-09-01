const express = require("express");
const router = express.Router();
const {validatorLogin,validatorRegister} = require("../validators/auth")
const {loginCtrl,registerCtrl} = require ("../controllers/auth")



// http://localhost:3000/api/auth/login
//http://localhost:3000/api/auth/register


//Crear un registro
router.post("/register", validatorRegister,registerCtrl );

router.post("/login", validatorLogin, loginCtrl);


module.exports = router 