const express=require( 'express')
const auth =require ('../middleware/auth.js')
const uploadImageController=require ('../controller/uploadImageController.js')
const upload =require('../middleware/multer.js')

const uploadRouter = express.Router()

uploadRouter.post("/upload",auth,upload.single("image"),uploadImageController)

module.exports= uploadRouter