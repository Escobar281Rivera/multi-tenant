const express = require("express");
const router = express.Router();
const {getItems, getItem, updateItem, createItem, deleteItem} = require("../controllers/tracks")
const {validatorCreateItem, validatorGetItem, validatorUpdateItem} = require("../validators/tracks")
const authMidleware = require('../middleware/session');
const checkRol = require("../middleware/rol");

// http://localhost/tracks GET, POST, DELETE, PUT
//lista de los items
router.get("/",authMidleware,getItems);
//Obtener detalle de item
router.get("/:id",authMidleware,validatorGetItem, getItem);
//Crear un registro
router.post("/",authMidleware,checkRol(["admin", "user"]),validatorCreateItem, createItem);
//Actualizar registro
router.put("/:id",authMidleware, validatorGetItem, validatorCreateItem, updateItem);
//eliminar item
router.delete("/:id",authMidleware, validatorGetItem, deleteItem);

module.exports = router 