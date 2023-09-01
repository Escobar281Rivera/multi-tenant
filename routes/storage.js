
const express = require("express");
 const router = express.Router();
const uploadMiddleware = require ("../utils/handleStorage")
const {createItem, getItem,getItems,deleteItem,updateItem} = require("../controllers/storage");
const {validatorGetItem} = require("../validators/storage")

 //http://localhost:30001/storage
 //lista de items
router.get("/", getItems);
//detalle del item
router.get("/:id",validatorGetItem, getItem);
//eliminar un item
router.delete("/:id",validatorGetItem,deleteItem);
//registrar un item
router.post("/", uploadMiddleware.single("myfile"),createItem);



 module.exports = router;