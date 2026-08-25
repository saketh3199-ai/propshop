import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage
(
    {
        destination(req,file,cb)
        {
            cb(null,'uploads/')         // put the file that is uploaded from front-end in uploads/ directory
        },
        filename(req, file, cb) 
        {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);      //generating unique names for image files being uploaded so that no replacement occurs
        }
    }
)

//         Uploaded file
//             ↓
//          Multer asks:
//      "Where should I put it?"
//              ↓
//        destination()
//              ↓
//          "uploads/"
//              ↓
//          Multer asks:
//      "What should I call it?"
//              ↓
//          filename()
//              ↓
//      "image-1755781234567.jpg"



function checkFileType(file, cb) 
{
    //THE BELOW IS A REGULAR EXPRESSION
    const filetypes = /jpg|jpeg|png/;

    //UPLOADING IMAGE NAME : photo.jpg
    //path.extname(file.originalname) : .jpg
    //.jpg.toLowercase() makes sure that if there is .JPG, it will be converted to .jpg
    //filetypes.test(.jpg) where filetypes has values /jpg,/jpeg,/png
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    //extname ---> FILE-EXTENSION
    //mimetype ---> MIMETYPE 
    //BOTH OF THE ABOVE PROVIDED BY THE BROWSER
    if (extname && mimetype) 
    {
        return cb(null, true);
    } 
    else 
    {
        cb('Images only!');
    }
}

//TELLING 'YO MULTER, USE THE INFORMATION IN STORAGE OBJECT WHERE THERE ARE FUNCTIONS THAT TELL YOU WHERE TO STORE AND THE NAME OF FILES
//YOU ARE STORING
const upload = multer({storage})



router.post('/',upload.single('image'),(request,response)=>
{
    response.send({message:'Image Uploaded',image:`/${request.file.path}`})
}
)

export default router