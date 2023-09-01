const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage =`${ __dirname}/../storage`
        cb(null, pathStorage) 
    },
    filename:function(req, file, cb){
        // reemplazara si ese archivo existe con el mismo nombre

        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`; //generar un nombre aleatorio
        cb(null, filename)
    },
 });

 const uploadMiddleware =multer({ storage})

 module.exports = uploadMiddleware