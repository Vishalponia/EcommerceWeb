const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req,file,cb){

        cb(null,"uploads/category-images");

    },

    filename:function(req,file,cb){

        const uniqueName = Date.now() + "-" + Math.round(Math.random()*1000);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );

    }

});

const fileFilter = (req,file,cb)=>{

    const allowedTypes = /jpg|jpeg|png|webp/;

    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mime = allowedTypes.test(file.mimetype);

    if(ext && mime){

        cb(null,true);

    }else{

        cb(new Error("Only Images Allowed"));

    }

};

module.exports = multer({
    storage,
    fileFilter,
});