const {encrypt, compare} = require("../utils/handlePassword")
const { matchedData } = require("express-validator");
const {tokenSign} = require ("../utils/handleJwt");
const {usersModel} = require("../models");
const {handleHttpError} = require ("../utils/handleError")


const registerCtrl = async(req, res)=>{
   try {
     req = matchedData(req);
     const password = await encrypt(req.password);
     const body = {...req, password};
     const dataUser = await usersModel.create(body);
     dataUser.set("password", undefined, {strict: false });
    
    const data = {
         token: await tokenSign(dataUser),
         user: dataUser
    }
     res.send({data});
   } catch (e) {
      handleHttpError(res, "ERROR REGISTER USER")
   }
   };

   const loginCtrl = async (req, res) => {
     try {
          req = matchedData(req);
          const user = await usersModel.findOne({email:req.email})
          
          if(!user){
               handleHttpError(res, "USER DONT EXIST", 404);
               return
          }

          const hashPassword = user.get('password');
          const check = await compare(req.password, hashPassword)

          if(!check){
               handleHttpError(res, "PASSWORD INVALID", 401);
               return
          }
          user.set('password', undefined, {strict: false})
          const data = {
               token: await tokenSign(user),
               user
          }
          res.send({data})
     } catch (e) {
      handleHttpError(res,"ERROR LOGIN USER",e)
     }
   };

   module.exports = {loginCtrl, registerCtrl};